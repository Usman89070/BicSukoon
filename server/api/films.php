<?php
/** Public, read-only list of the Current Status page films for both websites (see guests.php). */
declare(strict_types=1);
require dirname(__DIR__) . '/lib/bootstrap.php';
require __DIR__ . '/_list.php';
send_list('films', 'films');
