<?php
/**
 * Public, read-only list of honoured guests for the website.
 * Returns 404 until something has been saved in the admin panel, so the
 * website keeps using the list it was built with.
 */
declare(strict_types=1);
require dirname(__DIR__) . '/lib/bootstrap.php';
require __DIR__ . '/_list.php';
send_list('guests', 'guests');
