<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Menu;
use Illuminate\Support\Facades\Hash;

class DummyDataController extends Controller
{
    public function index(){
        \DB::beginTransaction();
        try{
            //Developer
            $newRole = new Role;
            $newRole->name = 'Developer';
            $registerRole = $newRole->save();

            $user = new User;
            $user->password = Hash::make('123456');
            $user->name = 'Developer';
            $user->email = 'developer@example.com';
            $user->username = 'developer@example.com';
            $user->role = 'Developer';
            $user->roleid = $newRole->id;
            $user->packageid = 0;
            $user->companyid = 0;
            $user->company = 'developer';

            $register = $user->save();


            //superadmin

            $newRole = new Role;
            $newRole->name = 'Superadmin';
            $registerRole = $newRole->save();

            $user = new User;
            $user->password = Hash::make('123456');
            $user->name = 'Superadmin';
            $user->email = 'superadmin@example.com';
            $user->username = 'superadmin@example.com';
            $user->role = 'Superadmin';
            $user->roleid = $newRole->id;
            $user->packageid = 0;
            $user->companyid = 0;
            $user->company = 'superadmin';

            $register = $user->save();

            //others
            $newRole = new Role;
            $newRole->name = 'Admin';
            $registerRole = $newRole->save();

            // $newMenu = new Menu;
            // $newMenu->name = 'vnav';
            // $registerMenu = $newMenu->save();            

        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['errors' => $e->getMessage()],500);
        }
        \DB::commit();

    }
}
