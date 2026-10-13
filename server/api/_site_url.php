<?php
/** The address the website is being served from, e.g. https://example.com (no trailing slash). */
declare(strict_types=1);

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === '_site_url.php') {
    http_response_code(404);
    exit;
}

function site_root_url(): string
{
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ($_SERVER['SERVER_PORT'] ?? '') === '443'
        || strtolower((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';
    // only a plain host name (and port) is accepted from the request
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'localhost'));
    if (!preg_match('/^[a-z0-9.-]+(:\d{1,5})?$/', $host)) {
        $host = strtolower((string) ($_SERVER['SERVER_NAME'] ?? 'localhost'));
    }
    // the site's folder: one level above api/ (empty when it sits at the domain root)
    $dir = rtrim(str_replace('\\', '/', dirname((string) ($_SERVER['SCRIPT_NAME'] ?? '/api/x.php'), 2)), '/');
    return ($https ? 'https' : 'http') . '://' . $host . $dir;
}
