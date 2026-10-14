<?php
/**
 * Video check page: open /api/videos-check.php to see, for every video the
 * website expects, whether the file is on the server and where. Also creates
 * the bic-videos folders and moves videos found inside the website into them.
 * Shows file names only (no server paths).
 */
declare(strict_types=1);

require dirname(__DIR__) . '/lib/video_store.php';

$moved = sync_video_store();
$slots = json_decode((string) @file_get_contents(dirname(__DIR__) . '/lib/video-slots.json'), true) ?: [];
$rows = [];
foreach ($slots as $slot) {
    $folder = (string) ($slot['folder'] ?? '');
    $name = (string) ($slot['name'] ?? '');
    if (!in_array($folder, VIDEO_FOLDERS, true) || !is_video_name($name)) continue;
    $where = is_file(video_store_dir($folder) . $name) ? 'bic-videos/' . $folder . '/' : (is_file(video_web_dir($folder) . $name) ? 'public_html/videos/' . $folder . '/ (being moved)' : null);
    $rows[] = [$folder, $name, $where];
}
// files in the safe folders that the website does not use (often a name typo)
$extra = [];
foreach (VIDEO_FOLDERS as $folder) {
    foreach (@scandir(video_store_dir($folder)) ?: [] as $f) {
        if (!is_video_name($f)) continue;
        $known = false;
        foreach ($rows as [$rf, $rn]) if ($rf === $folder && $rn === $f) $known = true;
        if (!$known) $extra[] = "bic-videos/$folder/$f";
    }
}

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');
$e = fn ($s) => htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>Video check</title>
<style>
body{font:15px/1.5 system-ui,sans-serif;margin:0;padding:24px;background:#f6f5fb;color:#1c155c}
h1{font-size:22px;margin:0 0 4px}p{margin:0 0 16px;color:#4a4670}
table{border-collapse:collapse;width:100%;max-width:900px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px -16px rgba(0,0,0,.3)}
th,td{padding:10px 14px;text-align:left;border-bottom:1px solid #ecebf5}th{background:#1c155c;color:#fff;font-weight:600}
.ok{color:#137a3a;font-weight:700}.no{color:#b3261e;font-weight:700}code{background:#efeef8;padding:1px 6px;border-radius:6px}
ul{max-width:900px}
</style></head><body>
<h1>Video check</h1>
<p>Folders <code>bic-videos/bic/</code> and <code>bic-videos/sukoon/</code> next to <code>public_html</code> are ready.<?= $moved ? ' Moved now: ' . $e(implode(', ', $moved)) . '.' : '' ?></p>
<table>
<tr><th>Website</th><th>Exact file name</th><th>On the server?</th></tr>
<?php foreach ($rows as [$folder, $name, $where]): ?>
<tr><td><?= $folder === 'bic' ? 'BIC' : 'Sukoon' ?></td><td><code><?= $e($name) ?></code></td><td><?= $where ? '<span class="ok">Yes</span> – ' . $e($where) : '<span class="no">Missing</span>' ?></td></tr>
<?php endforeach; ?>
</table>
<?php if ($extra): ?>
<p style="margin-top:20px">Videos in the folders that the website does not use (check the name):</p>
<ul><?php foreach ($extra as $x): ?><li><code><?= $e($x) ?></code></li><?php endforeach; ?></ul>
<?php endif; ?>
</body></html>
