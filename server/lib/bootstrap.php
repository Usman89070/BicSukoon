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
    'gallery' => ['label' => 'Gallery', 'one' => 'photo or video', 'photos' => 'gallery-photos', 'page' => '../bic/gallery'],
    'events' => ['label' => 'Events', 'one' => 'event', 'photos' => 'event-photos', 'page' => '../bic/events'],
];

const GALLERY_PROJECTS = ['bic' => 'BIC Gallery', 'sukoon' => 'Sukoon Gallery'];
const GALLERY_PHOTO_MAX_WIDTH = 2000;
const VIDEO_TYPES = ['mp4' => 'video/mp4', 'm4v' => 'video/mp4', 'webm' => 'video/webm', 'mov' => 'video/quicktime'];

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
    $defaults = ['photo' => null, 'hidden' => false];
    if ($type === 'events') $defaults += ['date' => '', 'time' => '', 'location' => '', 'body' => '', 'photos' => []];
    if ($type === 'gallery') $defaults += ['project' => 'bic', 'kind' => 'photo', 'builtin' => null, 'video' => null, 'video_uploaded' => false, 'youtube' => null];
    return array_map(fn ($g) => $g + $defaults, $seed['items'] ?? $seed['guests'] ?? []);
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
    if ($type === 'events') {
        return array_map(fn ($g) => [
            'id' => (string) $g['id'],
            'title' => (string) $g['name'],
            'date' => ($g['date'] ?? '') !== '' ? (string) $g['date'] : null,
            'time' => ($g['time'] ?? '') !== '' ? (string) $g['time'] : null,
            'location' => ($g['location'] ?? '') !== '' ? (string) $g['location'] : null,
            'body' => (string) ($g['body'] ?? ''),
            'photos' => array_values(array_map(fn ($f) => 'photo.php?t=events&f=' . rawurlencode($f), array_filter($g['photos'] ?? [], 'valid_photo_name'))),
        ], $items);
    }
    if ($type === 'gallery') {
        return array_map(fn ($g) => [
            'id' => (string) $g['id'],
            'title' => (string) $g['name'],
            'project' => isset(GALLERY_PROJECTS[$g['project'] ?? '']) ? $g['project'] : 'bic',
            'kind' => ($g['kind'] ?? 'photo') === 'video' ? 'video' : 'photo',
            'photo' => !empty($g['photo']) ? 'photo.php?t=gallery&f=' . rawurlencode($g['photo']) : null,
            'builtin' => !empty($g['builtin']) ? (string) $g['builtin'] : null,
            'video' => !empty($g['video']) ? (string) $g['video'] : null,
            'youtube' => !empty($g['youtube']) ? (string) $g['youtube'] : null,
        ], $items);
    }
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
 * small enough, otherwise shrunk (PHOTO_MAX_WIDTH, or GALLERY_PHOTO_MAX_WIDTH for
 * the gallery) as a JPEG. Returns the stored file name or throws with a friendly message.
 */
function store_photo(array $file, string $id, string $type = 'guests'): string
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) throw new RuntimeException('The photo could not be uploaded. Please try again.');
    $maxBytes = in_array($type, ['gallery', 'events'], true) ? 20 * 1024 * 1024 : MAX_UPLOAD_BYTES;
    $maxWidth = in_array($type, ['gallery', 'events'], true) ? GALLERY_PHOTO_MAX_WIDTH : PHOTO_MAX_WIDTH;
    if ($file['size'] > $maxBytes) throw new RuntimeException('The photo is larger than ' . ($maxBytes >> 20) . ' MB.');
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
        if ($w <= $maxWidth && !in_array($o, [3, 6, 8], true)) {
            $name .= '.' . $types[$info[2]];
            if (!move_uploaded_file($file['tmp_name'], $dir . $name)) throw new RuntimeException('The photo could not be saved.');
            return $name;
        }
        $nw = min($w, $maxWidth);
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

/* ------------------------------------------------------------ gallery videos */

/** bic-videos/<project>/ next to public_html: kept on redeploys, served at /videos/<project>/<file>. */
function gallery_video_dir(string $project): string
{
    if (!isset(GALLERY_PROJECTS[$project])) throw new InvalidArgumentException('Unknown gallery');
    $dir = dirname(__DIR__, 2) . '/bic-videos/' . $project . '/';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    return $dir;
}

function valid_video_name(string $name): bool
{
    return $name !== '' && $name[0] !== '.' && basename($name) === $name && strlen($name) <= 200
        && isset(VIDEO_TYPES[strtolower(pathinfo($name, PATHINFO_EXTENSION))]) && !preg_match('~[\x00-\x1f/\\\\]~', $name);
}

/** A video already on the server (uploaded with the File Manager)? */
function gallery_video_exists(string $project, string $name): bool
{
    if (!valid_video_name($name) || !isset(GALLERY_PROJECTS[$project])) return false;
    return is_file(gallery_video_dir($project) . $name) || is_file(dirname(__DIR__) . '/videos/' . $project . '/' . $name);
}

/** Stores an uploaded video in bic-videos/<project>/ and returns its file name. */
function store_video(array $file, string $id, string $project): string
{
    $err = $file['error'] ?? UPLOAD_ERR_NO_FILE;
    if ($err === UPLOAD_ERR_INI_SIZE || $err === UPLOAD_ERR_FORM_SIZE) {
        throw new RuntimeException('This video is larger than the server allows (' . ini_get('upload_max_filesize') . '). Upload it with Hostinger’s File Manager into bic-videos/' . $project . '/ and type its file name instead.');
    }
    if ($err !== UPLOAD_ERR_OK) throw new RuntimeException('The video could not be uploaded. Please try again.');
    $ext = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
    if (!isset(VIDEO_TYPES[$ext])) throw new RuntimeException('Please upload an MP4, WebM or MOV video.');
    if (function_exists('finfo_open')) {
        $mime = (string) finfo_file(finfo_open(FILEINFO_MIME_TYPE), $file['tmp_name']);
        if (!str_starts_with($mime, 'video/') && $mime !== 'application/octet-stream') throw new RuntimeException('This file does not look like a video.');
    }
    $name = slugify($id) . '-' . bin2hex(random_bytes(3)) . '.' . $ext;
    if (!move_uploaded_file($file['tmp_name'], gallery_video_dir($project) . $name)) throw new RuntimeException('The video could not be saved.');
    @chmod(gallery_video_dir($project) . $name, 0644);
    return $name;
}

/** Deletes a video only if it was uploaded through the admin panel. */
function delete_gallery_video(array $item): void
{
    if (!empty($item['video_uploaded']) && !empty($item['video']) && valid_video_name($item['video']) && isset(GALLERY_PROJECTS[$item['project'] ?? ''])) {
        @unlink(gallery_video_dir($item['project']) . $item['video']);
    }
}

/** YouTube id from a link (watch, youtu.be, shorts, embed) or a bare id; null if none. */
function youtube_id(string $text): ?string
{
    $text = trim($text);
    if ($text === '') return null;
    if (preg_match('~^[A-Za-z0-9_-]{11}$~', $text)) return $text;
    if (preg_match('~(?:youtube\.com/(?:watch\?(?:.*&)?v=|embed/|shorts/|live/)|youtu\.be/)([A-Za-z0-9_-]{11})~', $text, $m)) return $m[1];
    return null;
}

/** $_FILES['x'] from <input type=file multiple name="x[]"> as a list of single files. */
function uploaded_files(string $field): array
{
    $f = $_FILES[$field] ?? null;
    if (!$f || !is_array($f['name'])) return [];
    $out = [];
    foreach ($f['name'] as $i => $name) {
        if (($f['error'][$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) continue;
        $out[] = ['name' => $name, 'type' => $f['type'][$i], 'tmp_name' => $f['tmp_name'][$i], 'error' => $f['error'][$i], 'size' => $f['size'][$i]];
    }
    return $out;
}
