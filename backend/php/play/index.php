<?php
echo 'index', PHP_EOL;

require __DIR__.'/vendor/autoload.php';
// require __DIR__.'/sub.php';

$foo = new Song\Foo();
$foo->test();

$bar = new Song\Bar();
$bar->test();
