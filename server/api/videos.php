<?php
/**
 * Public list of the video files that are on the server, by website folder:
 * {"bic": ["a.mp4", …], "sukoon": […]}. The website reads it once per visit,
 * so each film can start at once instead of being checked one by one.
 */
declare(strict_types=1);

require dirname(__DIR__) . '/lib/video_store.php';

$list = [];
foreach (VIDEO_FOLDERS as $folder) {
    $names = [];
    foreach ([video_store_dir($folder), video_web_dir($folder)] as $dir) {
        foreach (@scandir($dir) ?: [] as $f) {
            if (is_video_name($f) && is_file($dir . $f)) $names[$f] = true;
        }
    }
    $list[$folder] = array_keys($names);
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');
header('X-LiteSpeed-Cache-Control: no-cache');
header('X-Content-Type-Options: nosniff');
echo json_encode($list, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
