<?php

namespace App\Library\RongCloud;

use Illuminate\Support\ServiceProvider;
use RongCloud;


class RongIMServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('RongIM', function () {
            include('API/rongcloud.php');
            $appKey = 'appKey';
            $appSecret = 'appSecret';
            return new RongCloud($appKey,$appSecret);
        });
    }
}
