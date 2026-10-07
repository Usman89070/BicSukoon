<?php
/** Serves a portrait uploaded through the admin panel. */
declare(strict_types=1);
require dirname(__DIR__) . '/lib/bootstrap.php';

$type = (string) ($_GET['t'] ?? 'guests');
$name = (string) ($_GET['f'] ?? '');
if (!isset(COLLECTIONS[$type]) || !valid_photo_name($name) || !is_file(photo_dir($type) . $name)) {
    http_response_code(404);
    exit;
}
$path = photo_dir($type) . $name;

$types = ['jpg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp'];
header('Content-Type: ' . $types[pathinfo($name, PATHINFO_EXTENSION)]);
header('Content-Length: ' . filesize($path));
header('Cache-Control: public, max-age=31536000, immutable'); // file names change on every upload
header('X-Content-Type-Options: nosniff');
readfile($path);
