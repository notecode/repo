<?php

// File Location: projectroot/app/Library/AwsS3/AwsS3ServiceProvider.php

namespace App\Library\AwsS3;

use Illuminate\Support\ServiceProvider;

class AwsS3ServiceProvider extends ServiceProvider
{
    const VERSION = '1.0.0';
    /**
     * Indicates the service is only loaded when called to save resources.
     *
     * @var bool
     */
    protected $defer = true;
    
    /**
     * Register the class so it can be accessed via App::make() by name: awss3
     *
     * @return void
     */
    public function register()
    {	
        $this->app->singleton('awss3', function () {
            return new AwsS3();
        });
    }
    /**
     * Provides an array of strings that map to the services in the register() function.
     * This function is only called when the provider is deferred so this is the only way
     * Laravel knows which services are actually available without calling them.
     *
     * @return array
     */
    public function provides()
    {
        return ['awss3'];
    }
}