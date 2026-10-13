<?php
/**
 * sitemap.xml for whatever domain the site is opened on, so it is right on
 * the temporary Hostinger address today and on the real domain later with
 * nothing to change. .htaccess routes these here:
 *   /sitemap.xml          → index of the three below
 *   /sitemap-home.xml     → the starting page
 *   /bic/sitemap.xml      → every BIC page (+ events added in the admin panel)
 *   /sukoon/sitemap.xml   → every Sukoon Village page
 * Page lists come from api/sitemap-routes.json, written at build time from
 * src/sites/<site>/routes.js.
 */
declare(strict_types=1);
require dirname(__DIR__) . '/lib/bootstrap.php';
require __DIR__ . '/_site_url.php';

$site = (string) ($_GET['site'] ?? 'index');
$build = read_json(__DIR__ . '/sitemap-routes.json', null);
if (!is_array($build) || !in_array($site, ['index', 'home', 'bic', 'sukoon'], true)) {
    http_response_code(404);
    header('Content-Type: text/plain');
    exit('Not found');
}

$root = site_root_url();
$lastmod = (string) ($build['built'] ?? date('Y-m-d'));
$x = fn (string $s) => htmlspecialchars($s, ENT_XML1 | ENT_QUOTES, 'UTF-8');

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=3600');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";

if ($site === 'index') {
    echo '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    $parts = ['/sitemap-home.xml'];
    foreach (['bic', 'sukoon'] as $id) {
        if (!empty($build['sites'][$id])) {
            $parts[] = rtrim((string) $build['sites'][$id]['base'], '/') . '/sitemap.xml';
        }
    }
    foreach ($parts as $p) {
        echo '  <sitemap><loc>' . $x($root . $p) . '</loc><lastmod>' . $x($lastmod) . "</lastmod></sitemap>\n";
    }
    echo "</sitemapindex>\n";
    exit;
}

if ($site === 'home') {
    $base = '';
    $routes = ['/'];
} else {
    $base = rtrim((string) $build['sites'][$site]['base'], '/');
    $routes = array_map('strval', (array) $build['sites'][$site]['routes']);
    // events added in the admin panel get their own pages on the BIC site
    if ($site === 'bic' && in_array('/events', $routes, true) && has_saved('events')) {
        foreach (public_items('events') as $ev) {
            $routes[] = '/events/' . rawurlencode($ev['id']);
        }
    }
}

echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($routes as $r) {
    $loc = $root . $base . ($r === '/' ? '/' : $r);
    $priority = $r === '/' ? '1.0' : '0.7';
    echo '  <url><loc>' . $x($loc) . '</loc><lastmod>' . $x($lastmod) . '</lastmod><priority>' . $priority . "</priority></url>\n";
}
echo "</urlset>\n";
