<?php

namespace App\Http\Controllers\app\company;

use App\Classes\Files;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Package;
use App\Models\Packagemodule;
use App\Models\Company;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompanyCreateController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data(){
        $package = Package::all();

        $packageOptions = array();
        $packageData = array();
        foreach($package as $v){
            $packageOptions[]=$v['name'];
            $packageData[$v['name']]=$v;
        }
        $result = array();
        $result['packageOptions']=$packageOptions;
        $result['packageData']=$packageData;
        return $result;
    }

    public function package(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $packageData = Packagemodule::where('packageid', $input['id'])->get();
        return response()->json($packageData, 200);
    }

    public function create(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required|max:128',
            'address' => 'required|max:255',
            'email' => 'required|email|unique:App\Models\Company,email|max:128',
            'phone' => 'sometimes|required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'first_name' => 'required|max:128',
            'last_name' => 'max:128',
            'adminEmail' => 'required|email|unique:App\Models\User,email|max:128',
            'adminPassword' => 'required|max:32|min:6',
            'packageList' => 'required'

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }


        \DB::beginTransaction();
        try{
            $company = new Company;

            $company->name = $input['name'];
            $company->address = $input['address'];
            $company->email = $input['email'];
            $company->phone = $input['phone'];
            $company->packageid = $input['packageList'];
            $company->website = $input['website'];
            $company->adminid = 0;

            $companyRegister = $company->save();

            $user = new User;
            $user->first_name = $input['first_name'];
            $user->last_name = $input['last_name'];
            $user->email = $input['adminEmail'];
            $user->username = $input['adminEmail'];
            $user->phone = $input['adminPhone'];
            $user->packageid = $input['packageList'];
            $user->password = Hash::make($input['adminPassword']);
            $user->roleid = CONST_ROLE_COMPANY_ADMIN;
            $user->companyid = $company->id;
            $adminRegister = $user->save();

            if($companyRegister){
                $updateCompanyData = array();
                if ($request->hasFile('logoData')){
                    $encrypted_name = Str::random(16); //Random String
                    $file = new Files();
                    $filename = $file->upload($request
                                    ->file('logoData'), 'public/company-'.$company->id, $encrypted_name, 200, 100, false);
                    $updateCompanyData['logo'] = $filename;
                }
                $updateCompanyData['adminid'] = $user->id;
                $update = Company::where('id', $company->id)->update($updateCompanyData);
            }
        }catch(Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();

        return response()->json([$adminRegister,'message'=>'Company created successfully'],200);
    }
}
