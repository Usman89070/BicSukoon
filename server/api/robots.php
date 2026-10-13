<?php
/** robots.txt for whatever domain the site is opened on (see sitemap.php). */
declare(strict_types=1);
require __DIR__ . '/_site_url.php';

header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: public, max-age=3600');
$root = site_root_url();
$path = parse_url($root, PHP_URL_PATH) ?: '';
echo "User-agent: *\n";
echo "Allow: $path/\n";
echo "Disallow: $path/admin/\n";
echo "Disallow: $path/api/\n";
echo "\nSitemap: $root/sitemap.xml\n";
