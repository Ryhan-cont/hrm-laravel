<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function __invoke(Request $request)
    {
        $reqUrlArr = explode("/",$request->path());
        if(strtolower($reqUrlArr[0])=='api'){
            abort(404, 'Invalid API request. (404)');
        }else{
            $lastPart = end($reqUrlArr);
            if(strpos($lastPart,'.') !== false){
                return response()->json('File not found', 404);
            }else{
                return view('application'); 
            }
        }

    }
}
