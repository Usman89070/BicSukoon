<?php
/**
 * Shared helpers for the guests admin panel and API.
 *
 * Data is kept OUTSIDE the website folder (../bic-data next to public_html)
 * so redeploying the site never wipes what was entered in the admin panel.
 * If that folder cannot be created, a protected folder inside the site is
 * used instead (and the admin panel shows a warning).
 */
declare(strict_types=1);

require __DIR__ . '/config.php';

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const PHOTO_MAX_WIDTH = 900;

function data_dir(): string
{
    static $dir = null;
    if ($dir !== null) return $dir;

    $webroot = dirname(__DIR__);                 // the deployed site folder (dist)
    $candidates = [dirname($webroot) . '/bic-data', $webroot . '/data'];
    foreach ($candidates as $i => $candidate) {
        if (!is_dir($candidate)) @mkdir($candidate, 0750, true);
        if (is_dir($candidate) && is_writable($candidate)) {
            if ($i > 0 && !file_exists($candidate . '/.htaccess')) {
                file_put_contents($candidate . '/.htaccess', "Require all denied\n");
            }
            return $dir = $candidate;
        }
    }
    http_response_code(500);
    exit('No writable data folder. Create a folder named "bic-data" next to public_html.');
}

function data_is_inside_site(): bool
{
    return str_starts_with(realpath(data_dir()) ?: '', realpath(dirname(__DIR__)) ?: '//');
}

function read_json(string $file, $default)
{
    if (!is_file($file)) return $default;
    $data = json_decode((string) file_get_contents($file), true);
    return $data === null ? $default : $data;
}

function write_json(string $file, $data): void
{
    $tmp = $file . '.' . bin2hex(random_bytes(4)) . '.tmp';
    file_put_contents($tmp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    rename($tmp, $file);
}

/**
 * The lists managed in the admin panel. Each has its own JSON file, seed
 * file (written by the build) and photo folder in the data folder.
 */
const COLLECTIONS = [
    'guests' => ['label' => 'Honoured Guests', 'one' => 'guest', 'photos' => 'guest-photos', 'page' => '../bic/honoured-guests'],
    'board' => ['label' => 'Board of Directors', 'one' => 'board member', 'photos' => 'board-photos', 'page' => '../bic/about#board'],
];

function collection(string $type): array
{
    if (!isset(COLLECTIONS[$type])) throw new InvalidArgumentException('Unknown list');
    return COLLECTIONS[$type];
}

/** Saved items, or the list the website was built with on first use. */
function load_items(string $type): array
{
    collection($type);
    $saved = read_json(data_dir() . "/$type.json", null);
    if (is_array($saved) && isset($saved['items'])) return $saved['items'];
    if ($type === 'guests' && is_array($saved) && isset($saved['guests'])) return $saved['guests']; // older format
    $seed = read_json(dirname(__DIR__) . "/api/$type-seed.json", ['items' => []]);
    return array_map(fn ($g) => $g + ['photo' => null, 'hidden' => false], $seed['items'] ?? $seed['guests'] ?? []);
}

function save_items(string $type, array $items): void
{
    collection($type);
    write_json(data_dir() . "/$type.json", ['updated' => date('c'), 'items' => array_values($items)]);
}

function has_saved(string $type): bool
{
    collection($type);
    return is_file(data_dir() . "/$type.json");
}

function photo_dir(string $type): string
{
    $dir = data_dir() . '/' . collection($type)['photos'] . '/';
    if (!is_dir($dir)) @mkdir($dir, 0750, true);
    return $dir;
}

/** Public JSON for the website: visible items only, photo as a URL path. */
function public_items(string $type): array
{
    $items = array_values(array_filter(load_items($type), fn ($g) => empty($g['hidden'])));
    return array_map(fn ($g) => [
        'id' => (string) $g['id'],
        'name' => (string) $g['name'],
        'role' => ($g['role'] ?? '') !== '' ? (string) $g['role'] : null,
        'memoriam' => !empty($g['memoriam']),
        'photo' => !empty($g['photo']) ? 'photo.php?t=' . $type . '&f=' . rawurlencode($g['photo']) : null,
    ], $items);
}

function slugify(string $text): string
{
    $text = strtolower(trim(preg_replace('/[^A-Za-z0-9]+/', '-', iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text) ?: $text), '-'));
    return $text !== '' ? substr($text, 0, 60) : 'guest';
}

function valid_photo_name(string $name): bool
{
    return (bool) preg_match('/^[a-z0-9-]+\.(jpg|png|webp)$/', $name);
}

/**
 * Validates an uploaded image and stores it: as uploaded when it is already
 * small enough, otherwise shrunk to PHOTO_MAX_WIDTH as a JPEG. Returns the stored file name or throws with a friendly message.
 */
function store_photo(array $file, string $id, string $type = 'guests'): string
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) throw new RuntimeException('The photo could not be uploaded. Please try again.');
    if ($file['size'] > MAX_UPLOAD_BYTES) throw new RuntimeException('The photo is larger than 8 MB.');
    $info = @getimagesize($file['tmp_name']);
    $types = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp'];
    if (!$info || !isset($types[$info[2]])) throw new RuntimeException('Please upload a JPG, PNG or WebP image.');

    $name = slugify($id) . '-' . bin2hex(random_bytes(3));
    $dir = photo_dir($type);

    if (function_exists('imagecreatetruecolor')) {
        $src = match ($info[2]) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($file['tmp_name']),
            IMAGETYPE_PNG => @imagecreatefrompng($file['tmp_name']),
            IMAGETYPE_WEBP => @imagecreatefromwebp($file['tmp_name']),
        };
        if (!$src) throw new RuntimeException('This image could not be read.');
        $o = 1;
        if ($info[2] === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
            $o = (@exif_read_data($file['tmp_name'])['Orientation'] ?? 1);
            if ($o === 3) $src = imagerotate($src, 180, 0);
            if ($o === 6) $src = imagerotate($src, -90, 0);
            if ($o === 8) $src = imagerotate($src, 90, 0);
        }
        [$w, $h] = [imagesx($src), imagesy($src)];
        // Small, upright photos are kept exactly as uploaded: re-encoding
        // would only lose quality.
        if ($w <= PHOTO_MAX_WIDTH && !in_array($o, [3, 6, 8], true)) {
            $name .= '.' . $types[$info[2]];
            if (!move_uploaded_file($file['tmp_name'], $dir . $name)) throw new RuntimeException('The photo could not be saved.');
            return $name;
        }
        $nw = min($w, PHOTO_MAX_WIDTH);
        $nh = (int) round($h * $nw / $w);
        $dst = imagecreatetruecolor($nw, $nh);
        imagefill($dst, 0, 0, imagecolorallocate($dst, 255, 255, 255));
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);
        imagejpeg($dst, $dir . $name . '.jpg', 90);
        return $name . '.jpg';
    }

    $name .= '.' . $types[$info[2]];
    if (!move_uploaded_file($file['tmp_name'], $dir . $name)) throw new RuntimeException('The photo could not be saved.');
    return $name;
}

function delete_photo(?string $name, string $type = 'guests'): void
{
    if ($name && valid_photo_name($name)) @unlink(photo_dir($type) . $name);
}
