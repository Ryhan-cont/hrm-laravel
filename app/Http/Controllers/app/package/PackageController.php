<?php

namespace App\Http\Controllers\app\package;

use App\Classes\Files;
use App\classes\Modules;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

use App\Models\Module;
use App\Models\Package;
use App\Models\Packagemodule;

use Illuminate\Support\Facades\Validator;

class PackageController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data(){
        $package = package::all();
        $module = Module::all();
        $packageModule = Packagemodule::all();
        $newPackageModule = array();
        foreach($packageModule as $v){
            $v['status']=true;
            $newPackageModule[$v['packageid']][]=$v;
        }

        $newPackage = array();
        foreach($package as $v){
            if(isset($newPackageModule[$v['id']])){
                $v['permission']=$newPackageModule[$v['id']];
            }else{
                $v['permission']=[];
            }
            $newPackage[]=$v;
        }

        $result = array();
        $result['package']=$newPackage;
        $result['module']=Modules::data($module);
        return $result; 
    }

    public function create(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required|unique:App\Models\Package|max:32',
            'period' => 'required|max:32',
            'periodvalue' => 'required|Integer',
            'nou' => 'required|Integer',
            'price' => 'required|Integer',
            'currency' => 'required|max:32',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $addedPermissions = array();
        foreach($input['permission'] as $v){
            if($v['status'] == true){
                $addedPermissions[]=$v;
            }
        }
        if(count($addedPermissions) == 0){
            return response()->json(['message' => array('permission' => array('Please select permissions.'))],422);
        }

        \DB::beginTransaction();
        try{
            $newPackage = new Package;
            foreach($input as $k => $v){
                if($k == 'permission'){
                    
                }else{
                    $newPackage->$k = $v;
                }
            }
            $register = $newPackage->save();
            if($register){
                foreach($addedPermissions as $v){
                    $newPackageModule = new Packagemodule;
                    $newPackageModule->name = $v['name'];
                    $newPackageModule->moduleid = $v['id'];
                    $newPackageModule->packageid = $newPackage->id;
                    $newPackageModule->subpermissions = $v['subpermissions'];
                    $newPackageModule->save();
                }
            }
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();
        return response()->json([$register,'message'=> 'Package created successfully'], 200);
        
    }

    public function update(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required',
            'name' => 'sometimes|required|unique:App\Models\Package,name,'.$input['id'].'|max:32',
            'period' => 'sometimes|required|max:32',
            'periodvalue' => 'sometimes|required|Integer',
            'nou' => 'sometimes|required|Integer',
            'price' => 'sometimes|required|Integer',
            'currency' => 'sometimes|required|max:32',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        if(isset($input['permission'])){
            $addedPermissions = array();
            foreach($input['permission'] as $v){
                if($v['status'] == true){
                    $addedPermissions[]=$v;
                }
            }
            if(count($addedPermissions) == 0){
                return response()->json(['message' => array('permission' => array('Please select permissions.'))],422);
            }            
        }
        \DB::beginTransaction();
        try{
            $data = array();
            foreach($input as $k => $v){
                if($k == 'permission'){
                    
                }else{
                    $data[$k] = $v;
                }
            }
            $update = Package::where('id', $input['id'])->update($data);
            if($update){
                if(isset($input['permission'])){
                    Packagemodule::where('packageid', $input['id'])->delete();
                    foreach($addedPermissions as $v){
                        $newPackageModule = new Packagemodule;
                        $newPackageModule->name = $v['name'];
                        $newPackageModule->moduleid = $v['id'];
                        $newPackageModule->packageid = $input['id'];
                        $newPackageModule->subpermissions = $v['subpermissions'];
                        $newPackageModule->save();

                    }
                }
            }
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();
        return response()->json([$update, 'message'=>'Package updated successfully'], 200);

    }
    
    public function delete(request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $company = Company::where('packageid',$request->id)->count();
        if ($company > 0){
            return response()->json(['message' => "This package is used in ".$company. " company.",], 422);
        }else{
            \DB::beginTransaction();
            try{

                $delete = Package::where('id', $input['id'])->delete();
                Packagemodule::where('packageid', $input['id'])->delete();
            }catch(\Exception $e){
                \DB::rollback();
                return response()->json(['message' => $e->getMessage()],500);
            }
            \DB::commit();
            return response()->json([$delete, 'message'=>'Package deleted successfully'], 200);
        }
    }  
}
