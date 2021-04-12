<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

use App\Models\Module;
use App\Models\Userrestriction;
use App\Models\Rolemodule;
use App\Models\Packagemodule;
use App\Models\Menumodule;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;


class ModuleController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data(){
        $module = Module::all();
        return response()->json($module, 200);
    }

    public function create(Request $request){
        $input = $request->all();


        $validator = Validator::make($input, $this->rules());
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $module = new Module;
        foreach($input as $k => $v){
            $module->$k = $v;
        }
        $register = $module->save();
        return response()->json([
            $register,
            'message' => 'Module created successfully'
        ], 200);
    }

    public function update(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, $this->rules('update',$input['id']));
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        \DB::beginTransaction();
        try{
            $data = array();
            foreach($input as $k => $v){
                $data[$k] = $v;
            }
            $update = Module::where('id', $input['id'])->update($data);

            $menuData = array();
            if(isset($input['name'])){$menuData['name']=$input['name'];}
            if(isset($input['url'])){$menuData['url']=$input['url'];}
            if(isset($input['is_visible'])){$menuData['is_visible']=$input['is_visible'];}
            if(isset($input['is_active'])){$menuData['is_active']=$input['is_active'];}
            if(isset($input['site_active'])){$menuData['site_active']=$input['site_active'];}
            if(isset($input['icon'])){$menuData['icon']=$input['icon'];}
            if(isset($input['disable_note'])){$menuData['disable_note']=$input['disable_note'];}
            if(isset($input['remark'])){$menuData['remark']=$input['remark'];}
            if(isset($input['type'])){$menuData['type']=$input['type'];}

            $updateMenuData = Menumodule::where('moduleid', $input['id'])->update($menuData);

            if(isset($input['subpermissions'])){
                $package = Packagemodule::where('moduleid', $input['id'])->get();
                foreach($package as $module){
                    $curPackage = Arr::pluck($module->subpermissions, 'status', 'name');
                    $newPermissions = array();
                    foreach($input['subpermissions'] as $v){
                        if(isset($curPackage[$v['name']])){
                            $v['status']=$curPackage[$v['name']];
                            $newPermissions[]=$v;
                        }else{
                            $v['status']=false;
                            $newPermissions[]=$v;
                        }
                    }
                    $packageData = array();
                    if(isset($input['name'])){$packageData['name']=$input['name'];}
                    $packageData['subpermissions']=$newPermissions;
                    $updatePackageData = Packagemodule::where('moduleid', $input['id'])->where('packageid', $module->packageid)->update($packageData);
                }

            }else{
                $packageData = array();
                if(isset($input['name'])){$packageData['name']=$input['name'];}
                $updatePackageData = Packagemodule::where('moduleid', $input['id'])->update($packageData);
            }



            if(isset($input['subpermissions'])){
                $role = Rolemodule::where('moduleid', $input['id'])->get();
                foreach($role as $module){
                    $curRole = Arr::pluck($module->subpermissions, 'status', 'name');
                    $newPermissions = array();
                    foreach($input['subpermissions'] as $v){
                        if(isset($curRole[$v['name']])){
                            $v['status']=$curRole[$v['name']];
                            $newPermissions[]=$v;
                        }else{
                            $v['status']=false;
                            $newPermissions[]=$v;
                        }
                    }

                    $roleData = array();
                    if(isset($input['name'])){$roleData['name']=$input['name'];}
                    if(isset($input['apiname'])){$roleData['apiname']=$input['apiname'];}
                    if(isset($input['url'])){$roleData['url']=$input['url'];}
                    if(isset($input['is_visible'])){$roleData['is_visible']=$input['is_visible'];}
                    if(isset($input['is_active'])){$roleData['is_active']=$input['is_active'];}
                    if(isset($input['site_active'])){$roleData['site_active']=$input['site_active'];}
                    if(isset($input['icon'])){$roleData['icon']=$input['icon'];}
                    if(isset($input['type'])){$roleData['type']=$input['type'];}
                    $roleData['subpermissions']=$newPermissions;

                    $updateRoleData = Rolemodule::where('moduleid', $input['id'])->where('roleid', $module->roleid)->update($roleData);
                }
            }else{
                $roleData = array();
                if(isset($input['name'])){$roleData['name']=$input['name'];}
                if(isset($input['apiname'])){$roleData['apiname']=$input['apiname'];}
                if(isset($input['url'])){$roleData['url']=$input['url'];}
                if(isset($input['is_visible'])){$roleData['is_visible']=$input['is_visible'];}
                if(isset($input['is_active'])){$roleData['is_active']=$input['is_active'];}
                if(isset($input['site_active'])){$roleData['site_active']=$input['site_active'];}
                if(isset($input['icon'])){$roleData['icon']=$input['icon'];}
                if(isset($input['type'])){$roleData['type']=$input['type'];}

                $updateRoleData = Rolemodule::where('moduleid', $input['id'])->update($roleData);
            }


            if(isset($input['subpermissions'])){
                $restrictionData = Userrestriction::where('moduleid', $input['id'])->get();
                $restrictions = Arr::pluck($restrictionData, 'subpermission', 'subpermission');
                $newPermissions = Arr::pluck($input['subpermissions'], 'name', 'name');


                $deleteRestrictions = array();
                foreach($restrictions as $k => $v){
                    if(!isset($newPermissions[$k])){
                        Userrestriction::where('subpermission', $k)->delete();
                    }
                }
            }

        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();
        return response()->json([
            $update,
            'message' => 'Module updated successfully'
        ], 200);

    }

    public function delete(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required|max:32',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }


        $userRole = Auth::user()->roleid;
        if($userRole != CONST_ROLE_DEVELOPER){
            return response()->json(['message' => 'Not permitted'],403);
        }

        \DB::beginTransaction();
        try{
            $delete = Module::where('id', $input['id'])->delete();
            Userrestriction::where('moduleid', $input['id'])->delete();
            Rolemodule::where('moduleid', $input['id'])->delete();
            Packagemodule::where('moduleid', $input['id'])->delete();
            Menumodule::where('moduleid', $input['id'])->delete();
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();
        return response()->json([
            $delete,
            'message' => 'Module deleted successfully'
        ], 200);

    }

    public function rules($type=null,$id=null){
        $ruleArr =  array(
            'name' => 'required|unique:App\Models\Module|max:32',
            'apiname' => 'required|unique:App\Models\Module|regex:/^[a-z-]+$/u|max:32',
            'url' => 'required|unique:App\Models\Module|max:255',
            'type' => 'required|max:32',
        );

        if($type == 'update'){
            $updateRules = array();
            foreach($ruleArr as $k => $v){
                $updateRules[$k] = 'sometimes|'.$v;
            }
            $updateRules['url'] = 'sometimes|required|unique:App\Models\Module,url,'.$id.'|max:255';
            $updateRules['name'] = 'sometimes|required|unique:App\Models\Module,name,'.$id.'|max:32';
            $updateRules['apiname'] = 'sometimes|required|unique:App\Models\Module,apiname,'.$id.'|regex:/^[a-z-]+$/u|max:32';
            return $updateRules;
        }else{
            return $ruleArr;
        }
    }
}
