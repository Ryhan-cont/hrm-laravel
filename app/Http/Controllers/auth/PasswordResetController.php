<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class PasswordResetController extends Controller
{
    public function forgotPassword(Request $request){

        $input = $request->all();
        $validator = Validator::make($input, [
            'email' => 'required|email',
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()],422);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json([
                'message' => "Please check the email($request->email) for password reset link",
                'status' => true
              ], 200)
            : response()->json([
                'message' => 'Something went wrong. please try again later',
                'status' => 406
              ], 406);
    }

    public function passwordReset(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:3|confirmed',
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()],422);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();

                $user->setRememberToken(Str::random(60));

                event(new PasswordReset($user));
            }
        );
        return $status === Password::PASSWORD_RESET
            ? response()->json([
                'message' => 'Password changed!',
                'status' => true
              ], 200)
            : response()->json([
                'message' => 'Something went wrong. please try again later',
                'status' => 406
              ], 406);
    }
}
