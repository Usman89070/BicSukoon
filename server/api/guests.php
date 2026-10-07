<?php
/**
 * Public, read-only list of honoured guests for the website.
 * Returns 404 until something has been saved in the admin panel, so the
 * website keeps using the list it was built with.
 */
declare(strict_types=1);
require dirname(__DIR__) . '/lib/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');
header('X-Content-Type-Options: nosniff');

if (!has_saved_guests()) {
    http_response_code(404);
    echo json_encode(['guests' => null]);
    exit;
}

$guests = array_values(array_filter(load_guests(), fn ($g) => empty($g['hidden'])));
$guests = array_map(fn ($g) => [
    'id' => (string) $g['id'],
    'name' => (string) $g['name'],
    'role' => ($g['role'] ?? '') !== '' ? (string) $g['role'] : null,
    'photo' => !empty($g['photo']) ? 'photo.php?f=' . rawurlencode($g['photo']) : null,
], $guests);

echo json_encode(['guests' => $guests], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
