<?php
/** Shared JSON response for the public list endpoints. */
declare(strict_types=1);

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === '_list.php') {
    http_response_code(404);
    exit;
}

function send_list(string $type, string $key): never
{
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-cache');
    header('X-Content-Type-Options: nosniff');
    if (!has_saved($type)) {
        http_response_code(404);
        echo json_encode([$key => null]);
        exit;
    }
    echo json_encode([$key => public_items($type)], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
