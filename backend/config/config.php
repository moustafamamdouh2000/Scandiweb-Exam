<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,DELETE");
$envFilePath = __DIR__ . '/.env';
$lines = file($envFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    list($key, $value) = explode('=', $line, 2);
    $_ENV[$key] = $value;
}
