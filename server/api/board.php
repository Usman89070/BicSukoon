<?php
/** Public, read-only Board of Directors for the website (see guests.php). */
declare(strict_types=1);
require dirname(__DIR__) . '/lib/bootstrap.php';
require __DIR__ . '/_list.php';
send_list('board', 'board');
