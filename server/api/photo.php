<?php
/** Serves a guest portrait uploaded through the admin panel. */
declare(strict_types=1);
require dirname(__DIR__) . '/lib/bootstrap.php';

$name = (string) ($_GET['f'] ?? '');
$path = data_dir() . '/guest-photos/' . $name;
if (!valid_photo_name($name) || !is_file($path)) {
    http_response_code(404);
    exit;
}

$types = ['jpg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp'];
header('Content-Type: ' . $types[pathinfo($name, PATHINFO_EXTENSION)]);
header('Content-Length: ' . filesize($path));
header('Cache-Control: public, max-age=31536000, immutable'); // file names change on every upload
header('X-Content-Type-Options: nosniff');
readfile($path);
