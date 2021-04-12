<?php

namespace App\Http\Controllers\app\company;

use App\Classes\Files;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Package;
use App\Models\Packagemodule;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompanyEditController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data(Request $request){
        $companyData = Company::where('id', $request->id)->first();
        $adminData = User::where('id', $companyData->adminid)->first();
        $companyPackage = Package::where('id', $companyData->packageid)->first();
        $packageModuleData = Packagemodule::where('packageid', $companyData->packageid)->get();
        $package = Package::all();

        $packageOptions = array();
        $packageData = array();
        foreach($package as $v){
            $packageOptions[]=$v['name'];
            $packageData[$v['name']]=$v;
        }


        $result = array(
            'companyData' => $companyData,
            'adminData' => $adminData,
            'packageData' => $packageData,
            'packageModuleData' => $packageModuleData,
            'packageOptions' => $packageOptions,
            'companyPackage' => $companyPackage,

        );
        return response()->json($result, 200);
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
    public function update(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'sometimes|required|max:32',
            'address' => 'sometimes|required|max:32',
            'email' => 'sometimes|required|email|unique:App\Models\Company,email,'.$input['id'].'|max:32',
            'phone' => 'sometimes|required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'first_name' => 'sometimes|required|max:32',
            'last_name' => 'max:32',
            'adminEmail' => 'sometimes|required|email|unique:App\Models\User,email,'.$input['adminId'].'|max:32',
            'adminPassword' => 'sometimes|required|max:32|min:6',
            'packageList' => 'sometimes|required',
            'id' => 'required',
            'adminId' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        \DB::beginTransaction();
        try{

            $data = array();
            if(isset($input['name'])){$data['name']=$input['name'];}
            if(isset($input['address'])){$data['address']=$input['address'];}
            if(isset($input['email'])){$data['email']=$input['email'];}
            if(isset($input['phone'])){$data['phone']=$input['phone'];}
            if(isset($input['packageList'])){$data['packageid']=$input['packageList'];}
            if(isset($input['website'])){$data['website']=$input['website'];}

            $update = Company::where('id', $input['id'])->update($data);

            $userData=array();
            if(isset($input['first_name'])){$userData['first_name']=$input['first_name'];}
            if(isset($input['last_name'])){$userData['last_name']=$input['last_name'];}
            if(isset($input['adminAddress'])){$userData['address']=$input['adminAddress'];}
            if(isset($input['adminEmail'])){$userData['email']=$input['adminEmail'];}
            if(isset($input['adminEmail'])){$userData['username']=$input['adminEmail'];}
            if(isset($input['adminPhone'])){$userData['phone']=$input['adminPhone'];}
            if(isset($input['packageList'])){$userData['packageid']=$input['packageList'];}
            $updateUser = User::where('id', $input['adminId'])->update($userData);

            if($update){
                if ($request->hasFile('logoData')){
                    $encrypted_name = Str::random(16); //Random String
                    $file = new Files();
                    $filename = $file->upload($request
                                     ->file('logoData'), 'public/company-'.$input['id'], $encrypted_name, 200, 100, false);
                    $updateCompanyData = array();
                    $updateCompanyData['logo'] = $filename;
                    $updateImage = Company::where('id', $input['id'])->update($updateCompanyData);
                }
            }

        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();

        return response()->json([$update, 'message'=>'Company updated successfully.'],200);
    }
}
