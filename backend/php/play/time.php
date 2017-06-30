<?php

echo "\n\n";
// echo date('now: Y-m-d H:i:s', time()) . PHP_EOL;

if (isset($argv[1])) {
    $ts = $argv[1];
    echo date('Y-m-d H:i:s', $ts) . PHP_EOL;
} else {
    echo 'no timestamp given me' . PHP_EOL;
}

echo "\n\n";
