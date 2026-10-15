<?php
/**
 * Serves every website video from bic-videos/bic/ and bic-videos/sukoon/
 * next to public_html, so videos survive redeploys (all /videos/<folder>/<file>
 * video requests are routed here by .htaccess). A video found in
 * public_html/videos/<folder>/ instead is moved to the safe folder first
 * (see lib/video_store.php). Both folders are created automatically.
 * Supports HTTP Range requests so browsers can stream and seek.
 */
declare(strict_types=1);

require dirname(__DIR__) . '/lib/video_store.php';

// The video is read from the address itself (/videos/<folder>/<file>), so any
// file name works (spaces, brackets); ?f=<folder>/<file> is the fallback (IIS).
// Only "<folder>/<file>" with folder bic or sukoon is accepted (no other paths).
$requested = (string) ($_GET['f'] ?? '');
$uriPath = rawurldecode((string) parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH));
if (preg_match('~/videos/((?:bic|sukoon)/[^/]+)$~i', $uriPath, $m)) $requested = $m[1];
$parts = explode('/', str_replace('\\', '/', $requested));
$folder = count($parts) === 2 && in_array($parts[0], VIDEO_FOLDERS, true) ? $parts[0] : null;
$name = $folder ? basename($parts[1]) : '';
$types = VIDEO_FILE_TYPES;
$ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
$path = '';
if ($folder && is_video_name($name)) {
    move_video_to_store($folder, $name);
    $path = video_store_dir($folder) . $name;
    // still inside the website (just uploaded, or it could not be moved): serve it from there
    if (!is_file($path) && is_file(video_web_dir($folder) . $name)) $path = video_web_dir($folder) . $name;
}

// Never let a server cache (Hostinger's LiteSpeed cache) or the browser keep
// these answers: a "not found" from before the upload would hide the video.
header('X-LiteSpeed-Cache-Control: no-cache');

if ($path === '' || !is_file($path)) {
    http_response_code(404);
    header('Cache-Control: no-store');
    header('Content-Type: text/plain');
    exit('Video not found');
}

$size = filesize($path);
$start = 0;
$end = $size - 1;

header('Content-Type: ' . $types[$ext]);
header('Accept-Ranges: bytes');
header('Cache-Control: public, max-age=86400');
header('X-Content-Type-Options: nosniff');

if (isset($_SERVER['HTTP_RANGE']) && preg_match('/bytes=(\d*)-(\d*)/', $_SERVER['HTTP_RANGE'], $m)) {
    if ($m[1] === '' && $m[2] !== '') {          // last N bytes
        $start = max(0, $size - (int) $m[2]);
    } else {
        $start = (int) $m[1];
        if ($m[2] !== '') $end = min((int) $m[2], $size - 1);
    }
    if ($start > $end || $start >= $size) {
        http_response_code(416);
        header("Content-Range: bytes */$size");
        exit;
    }
    http_response_code(206);
    header("Content-Range: bytes $start-$end/$size");
}

$length = $end - $start + 1;
header('Content-Length: ' . $length);
if ($_SERVER['REQUEST_METHOD'] === 'HEAD') exit;

$fp = fopen($path, 'rb');
fseek($fp, $start);
while ($length > 0 && !feof($fp) && !connection_aborted()) {
    $chunk = fread($fp, (int) min(1048576, $length));
    echo $chunk;
    flush();
    $length -= strlen($chunk);
}
fclose($fp);
