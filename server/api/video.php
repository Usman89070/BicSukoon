<?php
/**
 * Serves videos kept OUTSIDE the website folder, in bic-videos/ next to
 * public_html, so they survive redeploys. /videos/<file> is routed here by
 * .htaccess only when the file is not in public_html/videos/.
 * Supports HTTP Range requests so browsers can stream and seek.
 */
declare(strict_types=1);

$name = basename((string) ($_GET['f'] ?? ''));
$dir = dirname(__DIR__, 2) . '/bic-videos/';
$types = ['mp4' => 'video/mp4', 'm4v' => 'video/mp4', 'webm' => 'video/webm', 'mov' => 'video/quicktime'];
$ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
$path = $dir . $name;

if ($name === '' || $name[0] === '.' || !isset($types[$ext]) || !is_file($path)) {
    http_response_code(404);
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
