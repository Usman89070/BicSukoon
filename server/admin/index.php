<?php
/**
 * Admin panel for the lists on the website (Honoured Guests, Board of
 * Directors, Gallery). Sign in, then add, edit, reorder, hide or delete
 * people, photos and videos. Changes appear on the website immediately.
 */
declare(strict_types=1);
require dirname(__DIR__) . '/lib/bootstrap.php';

/* ---------------------------------------------------------------- session */
$secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
session_name(SESSION_NAME);
session_set_cookie_params(['lifetime' => 0, 'path' => '/admin', 'secure' => $secure, 'httponly' => true, 'samesite' => 'Strict']);
session_start();

header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');
header("Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; form-action 'self'; frame-ancestors 'none'");

$authed = !empty($_SESSION['admin']) && ($_SESSION['expires'] ?? 0) > time();
if ($authed) $_SESSION['expires'] = time() + SESSION_LIFETIME;
if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));

function e(?string $s): string { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }
function csrf_field(): string { return '<input type="hidden" name="csrf" value="' . e($_SESSION['csrf']) . '">'; }
function flash(string $msg, string $type = 'ok'): void { $_SESSION['flash'] = [$msg, $type]; }
function go(string $query = ''): never
{
    global $type;
    $q = 'list=' . $type . ($query !== '' && $query[0] !== '#' ? '&' . $query : '') . ($query !== '' && $query[0] === '#' ? $query : '');
    header('Location: ./?' . $q);
    exit;
}

function password_hash_current(): string
{
    $saved = read_json(data_dir() . '/admin.json', []);
    return $saved['password_hash'] ?? DEFAULT_PASSWORD_HASH;
}

/* ------------------------------------------------------- login throttling */
function attempts_file(): string { return data_dir() . '/login-attempts.json'; }
function client_key(): string { return hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown'); }
function locked_for(): int
{
    $a = read_json(attempts_file(), [])[client_key()] ?? null;
    if (!$a || $a['count'] < MAX_LOGIN_ATTEMPTS) return 0;
    return max(0, $a['time'] + LOCKOUT_SECONDS - time());
}
function record_attempt(bool $ok): void
{
    $all = read_json(attempts_file(), []);
    $all = array_filter($all, fn ($a) => $a['time'] > time() - LOCKOUT_SECONDS);
    if ($ok) unset($all[client_key()]);
    else $all[client_key()] = ['count' => ($all[client_key()]['count'] ?? 0) + 1, 'time' => time()];
    write_json(attempts_file(), $all);
}

/* ----------------------------------------------------------------- actions */
$type = (string) ($_POST['list'] ?? $_GET['list'] ?? 'guests');
if (!isset(COLLECTIONS[$type])) $type = 'guests';
$meta = COLLECTIONS[$type];
$isBoard = $type === 'board';
$isGallery = $type === 'gallery';
$isEvents = $type === 'events';
$guests = load_items($type);
$find = function (string $id) use (&$guests): ?int {
    foreach ($guests as $i => $g) if ($g['id'] === $id) return $i;
    return null;
};

if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($_POST) && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) {
    // The upload was bigger than the server accepts, so PHP dropped the whole form.
    flash('That file is larger than the server allows (' . ini_get('post_max_size') . '). For a big video, upload it with Hostinger’s File Manager into bic-videos/bic/ or bic-videos/sukoon/ and type its file name in the form instead.', 'error');
    go($isGallery || $isEvents ? 'new=1' : '');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf'], (string) ($_POST['csrf'] ?? ''))) {
        flash('Your session expired. Please try again.', 'error');
        go();
    }
    $action = (string) ($_POST['action'] ?? '');

    if ($action === 'login') {
        if ($wait = locked_for()) {
            flash('Too many attempts. Try again in ' . ceil($wait / 60) . ' minutes.', 'error');
            go();
        }
        $ok = hash_equals(ADMIN_USERNAME, trim((string) ($_POST['username'] ?? '')))
            && password_verify((string) ($_POST['password'] ?? ''), password_hash_current());
        record_attempt($ok);
        if (!$ok) {
            usleep(600000);
            flash('Wrong username or password.', 'error');
            go();
        }
        session_regenerate_id(true);
        $_SESSION['admin'] = true;
        $_SESSION['expires'] = time() + SESSION_LIFETIME;
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
        go();
    }

    if (!$authed) go();

    switch ($action) {
        case 'logout':
            $_SESSION = [];
            session_destroy();
            go();

        case 'save':
            if ($isEvents) {
                $title = trim((string) ($_POST['name'] ?? ''));
                $date = trim((string) ($_POST['date'] ?? ''));
                $id = (string) ($_POST['id'] ?? '');
                $back = $id !== '' ? 'edit=' . urlencode($id) : 'new=1';
                if ($title === '' || mb_strlen($title) > 200 || ($date !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date))) {
                    flash('Please enter a title (up to 200 characters) and a valid date.', 'error');
                    go($back);
                }
                $i = $id !== '' ? $find($id) : null;
                if ($i === null) {
                    $base = slugify($title);
                    $id = $base;
                    for ($n = 2; $find($id) !== null; $n++) $id = $base . '-' . $n;
                    $item = ['id' => $id, 'name' => $title, 'photos' => [], 'hidden' => false, 'photo' => null];
                } else {
                    $item = $guests[$i] + ['photos' => []];
                    $item['name'] = $title;
                }
                $item['date'] = $date;
                $item['time'] = mb_substr(trim((string) ($_POST['time'] ?? '')), 0, 80);
                $item['location'] = mb_substr(trim((string) ($_POST['location'] ?? '')), 0, 200);
                $item['body'] = mb_substr(trim(str_replace("\r", '', (string) ($_POST['body'] ?? ''))), 0, 5000);
                $item['hidden'] = !empty($_POST['hidden']);
                // remove ticked photos, then put the chosen cover first
                $remove = array_map('strval', (array) ($_POST['remove'] ?? []));
                foreach ($item['photos'] as $f) if (in_array($f, $remove, true)) delete_photo($f, $type);
                $item['photos'] = array_values(array_filter($item['photos'], fn ($f) => !in_array($f, $remove, true)));
                $cover = (string) ($_POST['cover'] ?? '');
                if ($cover !== '' && in_array($cover, $item['photos'], true)) {
                    $item['photos'] = array_values(array_merge([$cover], array_filter($item['photos'], fn ($f) => $f !== $cover)));
                }
                $added = 0;
                $problems = [];
                foreach (uploaded_files('photos') as $file) {
                    try {
                        $item['photos'][] = store_photo($file, $item['id'], $type);
                        $added++;
                    } catch (RuntimeException $ex) {
                        $problems[] = $file['name'] . ': ' . $ex->getMessage();
                    }
                }
                if ($i === null) {
                    array_unshift($guests, $item);
                } else {
                    $guests[$i] = $item;
                }
                save_items($type, $guests);
                if ($problems) {
                    flash('Saved “' . $title . '”, but some photos were not added — ' . implode(' · ', $problems), 'error');
                    go('edit=' . urlencode($item['id']));
                }
                flash('Saved “' . $title . '”' . ($added ? " with $added new photo" . ($added === 1 ? '' : 's') : '') . '.');
                go();
            }
            if ($isGallery) {
                $title = trim((string) ($_POST['name'] ?? ''));
                $project = (string) ($_POST['project'] ?? 'bic');
                $kind = ($_POST['kind'] ?? 'photo') === 'video' ? 'video' : 'photo';
                $id = (string) ($_POST['id'] ?? '');
                $back = $id !== '' ? 'edit=' . urlencode($id) : 'new=1';
                if ($title === '' || mb_strlen($title) > 200 || !isset(GALLERY_PROJECTS[$project])) {
                    flash('Please enter a title (up to 200 characters) and choose a gallery.', 'error');
                    go($back);
                }
                $i = $id !== '' ? $find($id) : null;
                if ($i === null) {
                    $base = slugify($title);
                    $id = $base;
                    for ($n = 2; $find($id) !== null; $n++) $id = $base . '-' . $n;
                    $item = ['id' => $id, 'name' => $title, 'project' => $project, 'kind' => $kind, 'photo' => null, 'builtin' => null, 'thumb' => null, 'video' => null, 'video_uploaded' => false, 'youtube' => null, 'hidden' => false];
                } else {
                    $item = $guests[$i] + ['video' => null, 'video_uploaded' => false, 'youtube' => null, 'builtin' => null, 'thumb' => null];
                    if ($item['project'] !== $project && !empty($item['video_uploaded']) && !empty($item['video'])) {
                        // keep an uploaded video with its gallery's folder
                        @rename(gallery_video_dir($item['project']) . $item['video'], gallery_video_dir($project) . $item['video']);
                    }
                    $item['name'] = $title;
                    $item['project'] = $project;
                    $item['kind'] = $kind;
                }
                $item['hidden'] = !empty($_POST['hidden']);
                try {
                    if (!empty($_POST['remove_photo'])) {
                        delete_photo($item['photo'], $type);
                        $item['photo'] = null;
                        $item['builtin'] = null;
                        $item['thumb'] = null;
                    }
                    if (($_FILES['photo']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
                        $new = store_photo($_FILES['photo'], $item['id'], $type);
                        delete_photo($item['photo'], $type);
                        $item['photo'] = $new;
                        $item['builtin'] = null;
                        $item['thumb'] = null;
                    }
                    if ($kind === 'video') {
                        $yt = trim((string) ($_POST['youtube'] ?? ''));
                        $file = trim((string) ($_POST['video_name'] ?? ''));
                        $hasUpload = ($_FILES['video']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE;
                        if ($hasUpload) {
                            $new = store_video($_FILES['video'], $item['id'], $project);
                            delete_gallery_video($item);
                            $item['video'] = $new;
                            $item['video_uploaded'] = true;
                            $item['youtube'] = null;
                        } elseif ($file !== '' && $file !== $item['video']) {
                            if (!gallery_video_exists($project, $file)) throw new RuntimeException('No video named “' . $file . '” was found in bic-videos/' . $project . '/. Check the spelling (including spaces and capitals) or upload it first.');
                            delete_gallery_video($item);
                            $item['video'] = $file;
                            $item['video_uploaded'] = false;
                            $item['youtube'] = null;
                        } elseif ($yt !== '') {
                            $ytId = youtube_id($yt);
                            if ($ytId === null) throw new RuntimeException('That does not look like a YouTube link.');
                            if ($ytId !== $item['youtube']) {
                                delete_gallery_video($item);
                                $item['video'] = null;
                                $item['video_uploaded'] = false;
                            }
                            $item['youtube'] = $ytId;
                        }
                        if (empty($item['video']) && empty($item['youtube'])) throw new RuntimeException('Add the video: upload a file, type the file name of a video already on the server, or paste a YouTube link.');
                    } else {
                        delete_gallery_video($item);
                        $item['video'] = null;
                        $item['video_uploaded'] = false;
                        $item['youtube'] = null;
                        if (empty($item['photo']) && empty($item['builtin'])) throw new RuntimeException('Please choose a photo to upload.');
                    }
                } catch (RuntimeException $ex) {
                    flash($ex->getMessage(), 'error');
                    go($back);
                }
                if ($i === null) {
                    ($_POST['position'] ?? 'start') === 'start' ? array_unshift($guests, $item) : $guests[] = $item;
                } else {
                    $guests[$i] = $item;
                }
                save_items($type, $guests);
                flash('Saved “' . $title . '”.');
                go();
            }
            $name = trim((string) ($_POST['name'] ?? ''));
            $role = trim((string) ($_POST['role'] ?? ''));
            $id = (string) ($_POST['id'] ?? '');
            if ($name === '' || mb_strlen($name) > 200 || mb_strlen($role) > 300) {
                flash('Please enter a name (up to 200 characters) and a title (up to 300).', 'error');
                go($id ? 'edit=' . urlencode($id) : 'new=1');
            }
            $i = $id !== '' ? $find($id) : null;
            if ($i === null) {
                $base = slugify($name);
                $id = $base;
                for ($n = 2; $find($id) !== null; $n++) $id = $base . '-' . $n;
                $guest = ['id' => $id, 'name' => $name, 'role' => $role, 'photo' => null, 'hidden' => false, 'memoriam' => false];
            } else {
                $guest = $guests[$i];
                $guest['name'] = $name;
                $guest['role'] = $role;
            }
            $guest['hidden'] = !empty($_POST['hidden']);
            if ($isBoard) $guest['memoriam'] = !empty($_POST['memoriam']);
            try {
                if (!empty($_POST['remove_photo'])) {
                    delete_photo($guest['photo'], $type);
                    $guest['photo'] = null;
                }
                if (($_FILES['photo']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
                    $new = store_photo($_FILES['photo'], $guest['id'], $type);
                    delete_photo($guest['photo'], $type);
                    $guest['photo'] = $new;
                }
            } catch (RuntimeException $ex) {
                flash($ex->getMessage(), 'error');
                go($i === null ? 'new=1' : 'edit=' . urlencode($guest['id']));
            }
            if ($i === null) {
                ($_POST['position'] ?? 'end') === 'start' ? array_unshift($guests, $guest) : $guests[] = $guest;
            } else {
                $guests[$i] = $guest;
            }
            save_items($type, $guests);
            flash('Saved “' . $name . '”.');
            go();

        case 'delete':
            if (($i = $find((string) ($_POST['id'] ?? ''))) !== null) {
                $name = $guests[$i]['name'];
                delete_photo($guests[$i]['photo'], $type);
                if ($isGallery) delete_gallery_video($guests[$i]);
                if ($isEvents) foreach ($guests[$i]['photos'] ?? [] as $f) delete_photo($f, $type);
                array_splice($guests, $i, 1);
                save_items($type, $guests);
                flash('Deleted “' . $name . '”.');
            }
            go();

        case 'move':
            if (($i = $find((string) ($_POST['id'] ?? ''))) !== null) {
                $j = ($_POST['dir'] ?? '') === 'up' ? $i - 1 : $i + 1;
                if ($j >= 0 && $j < count($guests)) {
                    [$guests[$i], $guests[$j]] = [$guests[$j], $guests[$i]];
                    save_items($type, $guests);
                }
            }
            go('#g-' . urlencode((string) $_POST['id']));

        case 'toggle':
            if (($i = $find((string) ($_POST['id'] ?? ''))) !== null) {
                $guests[$i]['hidden'] = empty($guests[$i]['hidden']);
                save_items($type, $guests);
                flash(($guests[$i]['hidden'] ? 'Hidden: ' : 'Shown: ') . $guests[$i]['name']);
            }
            go();

        case 'publish':
            save_items($type, $guests);
            flash('The list is now managed from this panel.');
            go();

        case 'password':
            $current = (string) ($_POST['current'] ?? '');
            $next = (string) ($_POST['next'] ?? '');
            if (!password_verify($current, password_hash_current())) {
                flash('The current password is not correct.', 'error');
                go('password=1');
            }
            if (mb_strlen($next) < 10 || $next !== ($_POST['confirm'] ?? '')) {
                flash('The new password must be at least 10 characters and both entries must match.', 'error');
                go('password=1');
            }
            write_json(data_dir() . '/admin.json', ['password_hash' => password_hash($next, PASSWORD_DEFAULT), 'changed' => date('c')]);
            flash('Password changed.');
            go();
    }
    go();
}

if ($authed && isset($_GET['export'])) {
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $type . '-' . date('Y-m-d') . '.json"');
    echo json_encode(['exported' => date('c'), 'list' => $type, 'items' => $guests], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/* -------------------------------------------------------------------- view */
$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
$editing = null;
if ($authed && isset($_GET['edit']) && ($i = $find((string) $_GET['edit'])) !== null) $editing = $guests[$i];
$creating = $authed && isset($_GET['new']);
$changingPassword = $authed && isset($_GET['password']);
$photoUrl = fn (?string $p) => $p ? '../api/photo.php?t=' . $type . '&f=' . rawurlencode($p) : null;
// picture shown for a row: uploaded photo, else the built-in render
$thumbOf = function (array $g) use ($photoUrl): ?string {
    if (!empty($g['photos'])) return $photoUrl($g['photos'][0]);                       // event cover
    if (!empty($g['photo'])) return $photoUrl($g['photo']);
    return !empty($g['thumb']) ? '../gallery-builtin/' . rawurlencode($g['thumb']) : null; // built-in render
};
$listField = '<input type="hidden" name="list" value="' . e($type) . '">';
$initials = function (string $name): string {
    $skip = '/^(her|his|the|most|eminent|right|honourable|excellency|mr|mrs|ms|dr|sheikh|sheikha|shaykh|sheik|imam|mufti|moulana|senator|councillor|inspector|of|bin|al|ibn|mp|ac|psm|phd)$/i';
    $w = array_values(array_filter(preg_split('/\s+/', preg_replace('/[^\p{L}\s\'-]/u', ' ', $name)), fn ($x) => $x !== '' && !preg_match($skip, $x)));
    return mb_strtoupper(mb_substr($w[0] ?? '', 0, 1) . (count($w) > 1 ? mb_substr(end($w), 0, 1) : ''));
};
$shown = count(array_filter($guests, fn ($g) => empty($g['hidden'])));
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title><?= e($authed ? $meta['label'] . ' · ' : '') ?>Admin · Brisbane Islamic Centre</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>
<?php if (!$authed): ?>
  <main class="login">
    <form class="card login__card" method="post" autocomplete="on">
      <p class="eyebrow">Brisbane Islamic Centre</p>
      <h1>Admin sign in</h1>
      <?php if ($flash): ?><p class="flash flash--<?= e($flash[1]) ?>" role="alert"><?= e($flash[0]) ?></p><?php endif; ?>
      <?= csrf_field() ?><?= $listField ?? '' ?>
      <input type="hidden" name="action" value="login">
      <label>Username <input name="username" required autocomplete="username" autofocus></label>
      <label>Password <input name="password" type="password" required autocomplete="current-password"></label>
      <button class="btn btn--primary" type="submit">Sign in</button>
    </form>
  </main>
<?php else: ?>
  <header class="top">
    <div class="top__inner">
      <a class="top__brand" href="./?list=<?= e($type) ?>"><span class="mark" aria-hidden="true">☾</span> BIC <small>Admin</small></a>
      <nav class="top__tabs" aria-label="Lists">
        <?php foreach (COLLECTIONS as $key => $c): ?>
          <a href="./?list=<?= e($key) ?>" <?= $key === $type ? 'aria-current="page"' : '' ?>><?= e($c['label']) ?></a>
        <?php endforeach; ?>
      </nav>
      <nav class="top__nav">
        <a href="<?= e($meta['page']) ?>" target="_blank" rel="noopener">View page ↗</a>
        <a href="?list=<?= e($type) ?>&amp;export=1">Download backup</a>
        <a href="?list=<?= e($type) ?>&amp;password=1">Change password</a>
        <form method="post"><?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="logout"><button class="link" type="submit">Sign out</button></form>
      </nav>
    </div>
  </header>

  <main class="wrap">
    <?php if ($flash): ?><p class="flash flash--<?= e($flash[1]) ?>" role="status"><?= e($flash[0]) ?></p><?php endif; ?>

    <?php if (data_is_inside_site()): ?>
      <p class="flash flash--warn">Data is being saved inside the website folder and could be lost on the next deploy. Create a folder named <code>bic-data</code> next to <code>public_html</code> (in Hostinger’s File Manager), then save again.</p>
    <?php endif; ?>

    <?php if ($changingPassword): ?>
      <form class="card form" method="post">
        <h2>Change password</h2>
        <?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="password">
        <label>Current password <input name="current" type="password" required autocomplete="current-password"></label>
        <label>New password <small>(at least 10 characters)</small> <input name="next" type="password" minlength="10" required autocomplete="new-password"></label>
        <label>Repeat new password <input name="confirm" type="password" minlength="10" required autocomplete="new-password"></label>
        <div class="form__actions"><button class="btn btn--primary" type="submit">Change password</button><a class="btn" href="./?list=<?= e($type) ?>">Cancel</a></div>
      </form>

    <?php elseif ($creating || $editing): $g = $editing ?? ['id' => '', 'name' => '', 'role' => '', 'photo' => null, 'hidden' => false, 'memoriam' => false]; ?>
      <form class="card form" method="post" enctype="multipart/form-data" action="./?list=<?= e($type) ?>">
        <h2><?= $editing ? 'Edit ' . e($meta['one']) : 'Add a ' . e($meta['one']) ?></h2>
        <?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="save"><input type="hidden" name="id" value="<?= e($g['id']) ?>">
        <?php if ($isEvents): $g += ['date' => '', 'time' => '', 'location' => '', 'body' => '', 'photos' => []]; ?>
        <div class="form__fields">
          <label>Event title <small>(shown as the heading)</small> <input name="name" value="<?= e($g['name']) ?>" required maxlength="200" placeholder="e.g. Brisbane’s Lord Mayor Visits Site"></label>
          <div class="form__row">
            <label>Date <small>(optional)</small> <input name="date" type="date" value="<?= e($g['date']) ?>"></label>
            <label>Time <small>(optional)</small> <input name="time" value="<?= e($g['time']) ?>" maxlength="80" placeholder="e.g. 6:00 pm"></label>
          </div>
          <label>Location <small>(optional)</small> <input name="location" value="<?= e($g['location']) ?>" maxlength="200" placeholder="e.g. Display centre, 161 Underwood Road"></label>
          <label>Description <small>(a blank line starts a new paragraph)</small> <textarea name="body" rows="5" maxlength="5000" placeholder="e.g. Brisbane’s Lord Mayor joined BIC committee members and guests for a visit to the display centre and construction site…"><?= e($g['body']) ?></textarea></label>
          <?php if ($g['photos']): ?>
            <fieldset class="photos">
              <legend>Photos <small>(choose the cover, tick to remove)</small></legend>
              <div class="photos__grid">
                <?php foreach ($g['photos'] as $n => $f): ?>
                  <div class="photos__item">
                    <img src="<?= e($photoUrl($f)) ?>" alt="" loading="lazy">
                    <label class="check"><input type="radio" name="cover" value="<?= e($f) ?>" <?= $n === 0 ? 'checked' : '' ?>> Cover</label>
                    <label class="check check--danger"><input type="checkbox" name="remove[]" value="<?= e($f) ?>"> Remove</label>
                  </div>
                <?php endforeach; ?>
              </div>
            </fieldset>
          <?php endif; ?>
          <label>Add photos <small>(select many at once; JPG, PNG or WebP, up to 20 MB each — this server accepts <?= e(ini_get('post_max_size')) ?> per save, so add large sets in a few goes)</small> <input name="photos[]" type="file" accept="image/jpeg,image/png,image/webp" multiple></label>
          <label class="check"><input type="checkbox" name="hidden" value="1" <?= !empty($g['hidden']) ? 'checked' : '' ?>> Hide from the website</label>
        </div>
        <?php elseif ($isGallery): $g += ['project' => 'bic', 'kind' => 'photo', 'video' => null, 'youtube' => null, 'thumb' => null]; $thumb = $thumbOf($g); ?>
        <div class="form__grid">
          <div class="form__photo form__photo--wide">
            <?php if ($thumb): ?><img src="<?= e($thumb) ?>" alt=""><?php else: ?><span class="mono"><?= $g['kind'] === 'video' ? '▶' : '?' ?></span><?php endif; ?>
          </div>
          <div class="form__fields">
            <label>Title <input name="name" value="<?= e($g['name']) ?>" required maxlength="200" placeholder="e.g. Eid open day 2026"></label>
            <label>Gallery <select name="project"><?php foreach (GALLERY_PROJECTS as $key => $label): ?><option value="<?= e($key) ?>" <?= $g['project'] === $key ? 'selected' : '' ?>><?= e($label) ?></option><?php endforeach; ?></select></label>
            <fieldset class="choice">
              <legend>Type</legend>
              <label class="check"><input type="radio" name="kind" value="photo" <?= $g['kind'] !== 'video' ? 'checked' : '' ?>> Photo</label>
              <label class="check"><input type="radio" name="kind" value="video" <?= $g['kind'] === 'video' ? 'checked' : '' ?>> Video</label>
            </fieldset>
            <label><span class="js-photo-label">Photo</span> <small>(JPG, PNG or WebP, up to 20 MB. For a video this is the optional cover picture.)</small> <input name="photo" type="file" accept="image/jpeg,image/png,image/webp"></label>
            <?php if ($thumb): ?><label class="check"><input type="checkbox" name="remove_photo" value="1"> Remove current picture</label><?php endif; ?>

            <div class="video-fields">
              <p class="video-fields__title">Video <small>— use one of these three ways</small></p>
              <?php if (!empty($g['video'])): ?><p class="muted">Current video: <code><?= e($g['video']) ?></code></p><?php elseif (!empty($g['youtube'])): ?><p class="muted">Current video: YouTube <code><?= e($g['youtube']) ?></code></p><?php endif; ?>
              <label>1. Upload a video <small>(MP4, WebM or MOV; this server accepts up to <?= e(ini_get('upload_max_filesize')) ?>)</small> <input name="video" type="file" accept="video/mp4,video/webm,video/quicktime,.mp4,.m4v,.webm,.mov"></label>
              <label>2. Or the file name of a video already on the server <small>(uploaded with the File Manager into <code>bic-videos/bic/</code> or <code>bic-videos/sukoon/</code>; best for large videos)</small> <input name="video_name" value="<?= e(empty($g['video_uploaded']) ? (string) $g['video'] : '') ?>" maxlength="200" placeholder="e.g. Eid open day.mp4"></label>
              <label>3. Or a YouTube link <input name="youtube" value="<?= !empty($g['youtube']) ? e('https://youtu.be/' . $g['youtube']) : '' ?>" maxlength="300" placeholder="https://www.youtube.com/watch?v=…"></label>
            </div>

            <label class="check"><input type="checkbox" name="hidden" value="1" <?= !empty($g['hidden']) ? 'checked' : '' ?>> Hide from the website</label>
            <?php if (!$editing): ?>
              <label>Place in the gallery <select name="position"><option value="start">First (newest at the top)</option><option value="end">Last</option></select></label>
            <?php endif; ?>
          </div>
        </div>
        <?php else: ?>
        <div class="form__grid">
          <div class="form__photo">
            <?php if ($g['photo']): ?><img src="<?= e($photoUrl($g['photo'])) ?>" alt=""><?php else: ?><span class="mono"><?= e($initials($g['name']) ?: '?') ?></span><?php endif; ?>
          </div>
          <div class="form__fields">
            <label>Name <input name="name" value="<?= e($g['name']) ?>" required maxlength="200" placeholder="<?= $isBoard ? 'e.g. Faisal Hatia' : 'e.g. Sheikh Ahmad Ali' ?>"></label>
            <?php if ($isBoard): ?>
              <label>Position <small>(optional)</small> <input name="role" value="<?= e($g['role'] ?? '') ?>" maxlength="300" placeholder="e.g. President, Secretary"></label>
              <label class="check"><input type="checkbox" name="memoriam" value="1" <?= !empty($g['memoriam']) ? 'checked' : '' ?>> In memoriam (shown with “In Memoriam” and a softened photo)</label>
            <?php else: ?>
              <label>Title / description <textarea name="role" rows="3" maxlength="300" placeholder="e.g. President of …"><?= e($g['role'] ?? '') ?></textarea></label>
            <?php endif; ?>
            <label>Photo <small>(JPG, PNG or WebP, up to 8 MB; portrait crops look best)</small> <input name="photo" type="file" accept="image/jpeg,image/png,image/webp"></label>
            <?php if ($g['photo']): ?><label class="check"><input type="checkbox" name="remove_photo" value="1"> Remove current photo</label><?php endif; ?>
            <label class="check"><input type="checkbox" name="hidden" value="1" <?= !empty($g['hidden']) ? 'checked' : '' ?>> Hide from the website</label>
            <?php if (!$editing): ?>
              <label>Place in the list <select name="position"><option value="end">At the end of the list</option><option value="start">At the top of the list</option></select></label>
            <?php endif; ?>
          </div>
        </div>
        <?php endif; ?>
        <div class="form__actions"><button class="btn btn--primary" type="submit">Save</button><a class="btn" href="./?list=<?= e($type) ?>">Cancel</a></div>
      </form>

    <?php else: ?>
      <div class="head">
        <div>
          <h1><?= e($meta['label']) ?></h1>
          <p class="muted"><?= count($guests) ?> <?= $isEvents ? 'events' : ($isGallery ? 'photos and videos' : ($isBoard ? 'members' : 'guests')) ?> · <?= $shown ?> shown on the website</p>
        </div>
        <a class="btn btn--primary" href="?list=<?= e($type) ?>&amp;new=1">+ Add a <?= e($meta['one']) ?></a>
      </div>

      <?php if (!has_saved($type)): ?>
        <form class="flash flash--info" method="post">
          This is the list the website was built with. It is used as-is until you save a change here.
          <?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="publish">
          <button class="link" type="submit">Start managing it here</button>
        </form>
      <?php endif; ?>

      <ol class="list">
        <?php foreach ($guests as $i => $g): ?>
          <li class="row<?= $isGallery || $isEvents ? ' row--gallery' : '' ?><?= !empty($g['hidden']) ? ' row--hidden' : '' ?>" id="g-<?= e($g['id']) ?>">
            <span class="row__num"><?= $i + 1 ?></span>
            <?php $thumb = $thumbOf($g); ?>
            <span class="row__thumb<?= $isGallery || $isEvents ? ' row__thumb--wide' : '' ?>"><?php if ($thumb): ?><img src="<?= e($thumb) ?>" alt="" loading="lazy"><?php else: ?><span class="mono"><?= $isGallery ? '▶' : ($isEvents ? '✦' : e($initials($g['name']))) ?></span><?php endif; ?></span>
            <span class="row__text">
              <strong><?= e($g['name']) ?></strong>
              <?php if (!empty($g['role'])): ?><span class="muted"><?= e($g['role']) ?></span><?php endif; ?>
              <?php if (!empty($g['memoriam'])): ?><span class="tag tag--memoriam">In memoriam</span><?php endif; ?>
              <?php if (!empty($g['hidden'])): ?><span class="tag">Hidden</span><?php endif; ?>
              <?php if ($isEvents): ?>
                <?php if (!empty($g['date'])): ?><span class="muted"><?= e(date('j F Y', strtotime($g['date']))) ?></span><?php endif; ?>
                <span class="tag"><?= count($g['photos'] ?? []) ?> photos</span>
              <?php elseif ($isGallery): ?>
                <span class="tag"><?= e(GALLERY_PROJECTS[$g['project'] ?? 'bic'] ?? 'BIC Gallery') ?></span>
                <?php if (($g['kind'] ?? '') === 'video'): ?><span class="tag tag--video">Video<?= !empty($g['youtube']) ? ' · YouTube' : '' ?></span><?php endif; ?>
              <?php elseif (!$g['photo']): ?><span class="tag tag--soft">No photo</span><?php endif; ?>
            </span>
            <span class="row__actions">
              <form method="post"><?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="move"><input type="hidden" name="id" value="<?= e($g['id']) ?>"><input type="hidden" name="dir" value="up"><button class="icon" type="submit" title="Move up" aria-label="Move <?= e($g['name']) ?> up" <?= $i === 0 ? 'disabled' : '' ?>>↑</button></form>
              <form method="post"><?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="move"><input type="hidden" name="id" value="<?= e($g['id']) ?>"><input type="hidden" name="dir" value="down"><button class="icon" type="submit" title="Move down" aria-label="Move <?= e($g['name']) ?> down" <?= $i === count($guests) - 1 ? 'disabled' : '' ?>>↓</button></form>
              <a class="btn btn--sm" href="?list=<?= e($type) ?>&amp;edit=<?= e(urlencode($g['id'])) ?>">Edit</a>
              <form method="post"><?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="toggle"><input type="hidden" name="id" value="<?= e($g['id']) ?>"><button class="btn btn--sm" type="submit"><?= !empty($g['hidden']) ? 'Show' : 'Hide' ?></button></form>
              <form method="post" class="js-confirm" data-confirm="Delete <?= e($g['name']) ?>? This cannot be undone."><?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?= e($g['id']) ?>"><button class="btn btn--sm btn--danger" type="submit">Delete</button></form>
            </span>
          </li>
        <?php endforeach; ?>
      </ol>
    <?php endif; ?>
  </main>
  <script src="admin.js"></script>
<?php endif; ?>
</body>
</html>
