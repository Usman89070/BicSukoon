<?php
/**
 * Video storage that survives redeploys.
 *
 * Videos live in bic-videos/bic/ and bic-videos/sukoon/ NEXT TO public_html,
 * which a redeploy never touches. Both folders are created automatically.
 * A video uploaded into public_html/videos/<folder>/ (easy to do by mistake)
 * is moved into the safe folder automatically the first time it is needed,
 * or when the admin panel is opened, so it is not lost on the next redeploy.
 */
declare(strict_types=1);

const VIDEO_FOLDERS = ['bic', 'sukoon'];
const VIDEO_FILE_TYPES = ['mp4' => 'video/mp4', 'm4v' => 'video/mp4', 'webm' => 'video/webm', 'mov' => 'video/quicktime'];
// A file changed within this many seconds may still be uploading: leave it.
const VIDEO_SETTLE_SECONDS = 120;

/** bic-videos/<folder>/ next to public_html (created if missing). */
function video_store_dir(string $folder): string
{
    $dir = dirname(__DIR__, 2) . '/bic-videos/' . $folder . '/';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    return $dir;
}

/** public_html/videos/<folder>/: inside the website, replaced on redeploys. */
function video_web_dir(string $folder): string
{
    return dirname(__DIR__) . '/videos/' . $folder . '/';
}

function is_video_name(string $name): bool
{
    return $name !== '' && $name[0] !== '.' && basename($name) === $name && strlen($name) <= 200
        && isset(VIDEO_FILE_TYPES[strtolower(pathinfo($name, PATHINFO_EXTENSION))]) && !preg_match('~[\x00-\x1f/\\\\]~', $name);
}

/**
 * Moves one video from public_html/videos/<folder>/ into bic-videos/<folder>/
 * (replacing an older copy there). Returns true when it was moved.
 */
function move_video_to_store(string $folder, string $name): bool
{
    if (!in_array($folder, VIDEO_FOLDERS, true) || !is_video_name($name)) return false;
    $from = video_web_dir($folder) . $name;
    if (!is_file($from) || time() - (int) filemtime($from) < VIDEO_SETTLE_SECONDS) return false;
    $to = video_store_dir($folder) . $name;
    if (!@rename($from, $to)) return false;
    @chmod($to, 0644);
    return true;
}

/** Creates both safe folders and moves every video found inside the website into them. */
function sync_video_store(): array
{
    $moved = [];
    foreach (VIDEO_FOLDERS as $folder) {
        video_store_dir($folder);
        foreach (@scandir(video_web_dir($folder)) ?: [] as $name) {
            if (move_video_to_store($folder, $name)) $moved[] = "$folder/$name";
        }
    }
    return $moved;
}
