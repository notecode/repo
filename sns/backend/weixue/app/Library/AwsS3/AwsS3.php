<?php

// File Location: projectroot/app/Library/AwsS3/AwsS3.php

namespace App\Library\AwsS3;

use \AWS;

class AwsS3
{
    public function listBuckets() {
        return ['Name' => 'Foo'];
    }
}