<?php

// File Location: projectroot/app/Library/AwsS3/AwsS3Facade.php

namespace App\Library\AwsS3;

use Illuminate\Support\Facades\Facade;

class AwsS3Facade extends Facade
{
    /**
     * Get the registered name of the component so it can be used as a facade.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'awss3';
    }
}