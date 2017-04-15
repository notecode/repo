<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Geotools;

class FooController extends Controller
{
    public function index()
    {
        return ['succ' => 1, 'msg' => 'Foo is OK'];
    }

    public function geo() {
        $coordA   = Geotools::coordinate([48.8234055, 2.3072664]);
        $coordB   = Geotools::coordinate([43.296482, 5.36978]);
        $distance = Geotools::distance()->setFrom($coordA)->setTo($coordB);

        printf("%s\n",$distance->flat()); // 659166.50038742 (meters)
        printf("%s\n",$distance->in('km')->haversine()); // 659.02190812846
        printf("%s\n",$distance->in('mi')->vincenty()); // 409.05330679648
        printf("%s\n",$distance->in('ft')->flat()); // 2162619.7519272
    }

    public function geoMy() {
        $my = [39.9891120584025, 116.449490707394];
        $tam = [39.908692, 116.397477];

        $coordA   = Geotools::coordinate($my);
        $coordB   = Geotools::coordinate($tam);
        $distance = Geotools::distance()->setFrom($coordA)->setTo($coordB);

        printf("我到天安门的距离: %s\n",$distance->in('km')->flat());
    }
}
