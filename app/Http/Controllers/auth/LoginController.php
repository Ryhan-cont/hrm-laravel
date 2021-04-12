<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Spatie\Activitylog\Contracts\Activity;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'email' => 'required|email|max:64',
            'password' => 'required|max:255|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();

            /*activity()->useLog('users')
                    ->performedOn($request->user())
                    ->causedBy($request->user()->id)
                    ->log('Login successful');*/
            activity()
                ->useLog('users')
                ->causedBy($request->user()->id)
                ->tap(function(Activity $activity) {
                    $activity->company_id = auth()->user()->companyid;
                    $activity->ip = request()->ip();
                })
                ->log('Login successful');

            return response()->json(array('status' => true,), 200);

        }
        return response()->json(array('message' => 'The provided credentials do not match our records.'), 401);
    }
}
