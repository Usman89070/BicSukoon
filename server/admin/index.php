<?php
/**
 * Admin panel for the lists on the website (Honoured Guests, Board of
 * Directors). Sign in, then add, edit, reorder, hide or delete people and
 * upload their portraits. Changes appear on the website immediately.
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
$guests = load_items($type);
$find = function (string $id) use (&$guests): ?int {
    foreach ($guests as $i => $g) if ($g['id'] === $id) return $i;
    return null;
};

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
      <form class="card form" method="post" enctype="multipart/form-data">
        <h2><?= $editing ? 'Edit ' . e($meta['one']) : 'Add a ' . e($meta['one']) ?></h2>
        <?= csrf_field() ?><?= $listField ?? '' ?><input type="hidden" name="action" value="save"><input type="hidden" name="id" value="<?= e($g['id']) ?>">
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
        <div class="form__actions"><button class="btn btn--primary" type="submit">Save</button><a class="btn" href="./?list=<?= e($type) ?>">Cancel</a></div>
      </form>

    <?php else: ?>
      <div class="head">
        <div>
          <h1><?= e($meta['label']) ?></h1>
          <p class="muted"><?= count($guests) ?> <?= $isBoard ? 'members' : 'guests' ?> · <?= $shown ?> shown on the website</p>
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
          <li class="row<?= !empty($g['hidden']) ? ' row--hidden' : '' ?>" id="g-<?= e($g['id']) ?>">
            <span class="row__num"><?= $i + 1 ?></span>
            <span class="row__thumb"><?php if ($g['photo']): ?><img src="<?= e($photoUrl($g['photo'])) ?>" alt="" loading="lazy"><?php else: ?><span class="mono"><?= e($initials($g['name'])) ?></span><?php endif; ?></span>
            <span class="row__text">
              <strong><?= e($g['name']) ?></strong>
              <?php if (!empty($g['role'])): ?><span class="muted"><?= e($g['role']) ?></span><?php endif; ?>
              <?php if (!empty($g['memoriam'])): ?><span class="tag tag--memoriam">In memoriam</span><?php endif; ?>
              <?php if (!empty($g['hidden'])): ?><span class="tag">Hidden</span><?php endif; ?>
              <?php if (!$g['photo']): ?><span class="tag tag--soft">No photo</span><?php endif; ?>
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
