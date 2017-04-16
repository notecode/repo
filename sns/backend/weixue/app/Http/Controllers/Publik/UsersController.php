<?php

namespace App\Http\Controllers\Publik;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Geotools;

class UsersController extends Controller
{
    public function all(Request $request)
    {
        return User::all();
    }

    public function page(Request $request)
    {
        if (1 == $request->byloc) {
            return $this->nearby($request);
        } else {
            return User::paginate($request->size);
        }
    }

    public function nearby(Request $request)
    {
        $latU = $request->lat;
        $longU = $request->long;

        if (is_null($latU) || is_null($longU)) {
            return response()->json(["error" => "you should supply your position"], 402);
        }

        $coorU = Geotools::coordinate([$latU, $longU]);

        $users = User::all();
        $users->each(function ($user, $key) use ($coorU) {
            $latC = $user->lat;
            $longC = $user->long;

            if (is_null($latC) || is_null($longC)) {
                $user->far = 1000000 * 1000.0;
            } else {
                $coorC = Geotools::coordinate([$latC, $longC]);
                $user->far = Geotools::distance()->setFrom($coorC)->setTo($coorU)->flat();
            }
        });

        $sorted = $users->sortBy('far');
        $page = $sorted->forPage($request->page, $request->size);
        return response()->Json(['data' => $page->values()]);
    }
}
