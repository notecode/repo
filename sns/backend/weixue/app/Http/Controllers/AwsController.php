<?php

// File Location: projectroot/app/Http/Controllers/AwsController.php

namespace App\Http\Controllers;

use \App;
use \AwsS3;

class AwsController extends Controller
{
     /**
     * Get a list of all the buckets in S3 and send to the view.
     *
     * @return array
     */
    public function index()
    {
        // Method 1: Access via facade
        // Requires Laravel service provider and facade
        // $arr = AwsS3::listBuckets();
        // return $arr;
        
        // Method 2: Access via service container
        // Requires Laravel service provider
        $s3 = App::make('awss3');
        $arr = $s3->listBuckets();
        return $arr;
        
        // Method 3: Access via namespace
        // Nothing required from Laravel, native PHP functionality
    	//$s3 = new \App\Library\AwsS3\AwsS3;
    	//$arr = $s3->listBuckets();
        
        // Name of the view is index.blade.php and in folder called aws
        // The variable, $arr, will be accessible in the view since we called
        // it using the compact() function. Make sure to pass arr as a string
        // and not as a variable.
        return view('aws.index', compact('arr'));
    }
}
