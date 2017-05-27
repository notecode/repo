<?php

require 'vendor/autoload.php';

try {
    $image = new \claviska\SimpleImage();

    $image
        ->fromFile('./assets/large.jpg')
        ->autoOrient()                              // adjust orientation based on exif data
        ->resize(320, 200)                          // resize to 320x200 pixels
        ->flip('y')                                 // flip horizontally
        ->colorize('DarkBlue')                      // tint dark blue
        ->toFile('./dist/new-image2.png', 'image/jpeg');

} catch(Exception $err) {
    // Handle errors
    echo $err->getMessage();
}
