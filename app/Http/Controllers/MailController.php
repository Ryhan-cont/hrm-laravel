<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Facades\View;



use App\Mail\PasswordReset;

class MailController extends Controller
{
    public function index(Request $request){
        return response()->json([
            'status' =>1,
            'message' => 'Dropdown updsted successfully'
         ], 422);
        $details = [
            'xxx' => 'yyy'
        ];

        return View::make('mail.companyCreated', ['details' => $details]);     
        // $detail = [
        //     'xxx' => 'yyy'
        // ];
        // Mail::to('ryhan.cont@gmail.com')->send(new PasswordReset($detail));
        // dd('xxx');
    }

}
