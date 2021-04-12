<?php

namespace App\Http\Controllers\app;

use App\classes\Modules;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;

use App\Models\Module;
use App\Models\Role;
use App\Models\Rolemodule;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data(){
        $role = Role::all();
        $module = Module::all();

        $roleModule = Rolemodule::all();
        $newRoleModule = array();
        foreach($roleModule as $v){
            $v['status'] = true;
            $newRoleModule[$v['roleid']][]=$v;
        }

        $newRole = array();
        foreach($role as $v){
            if(isset($newRoleModule[$v['id']])){
                $v['permission']=$newRoleModule[$v['id']];
            }else{
                $v['permission']=[];
            }
            $newRole[]=$v;
        }

        $result = array();
        $result['role']=$newRole;
        $result['module']=Modules::data($module);
        return $result;
    }
    public function create(Request $request){
        $input = $request->all();

        $permissions = $this->cleanupPermissions($input['permission']);

        if(count($permissions) == 0){
            return response()->json(['message' => array('permission' => array('Please select sub-permissions.'))],422);
        }

        $validator = Validator::make($input, $this->rules());
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        \DB::beginTransaction();
        try{
            $newRole = new Role;
            foreach($input as $k => $v){
                if($k == 'permission'){

                }else{
                    $newRole->$k = $v;
                }
            }
            $register = $newRole->save();
            if($register){
                foreach($permissions as $v){
                    $newRoleModule = new Rolemodule;
                    $newRoleModule->name = $v['name'];
                    $newRoleModule->apiname = $v['apiname'];
                    $newRoleModule->moduleid = $v['id'];
                    $newRoleModule->roleid = $newRole->id;
                    $newRoleModule->is_visible = $v['is_visible'];
                    $newRoleModule->is_active = $v['is_active'];
                    $newRoleModule->site_active = $v['site_active'];
                    $newRoleModule->url = $v['url'];
                    $newRoleModule->icon = $v['icon'];
                    $newRoleModule->subpermissions = $v['subpermissions'];
                    $newRoleModule->disable_note = $v['disable_note'];
                    $newRoleModule->remark = $v['remark'];
                    $newRoleModule->type = $v['type'];
                    $newRoleModule->save();
                }
            }
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();
        return response()->json([
            $register,
            'message'=>'Role created succssfully.'
        ],200);
    }
    public function update(Request $request){
        $input = $request->all();

        if(isset($input['permission'])){
            $permissions = $this->cleanupPermissions($input['permission']);
            if(count($permissions) == 0){
                return response()->json(['message' => array('permission' => array('Please select sub-permissions.'))],422);
            }
        }

        $validator = Validator::make($input, $this->rules('update',$input['id']));
        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
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

            $update = Role::where('id', $input['id'])->update($data);
            if($update){
                if(isset($input['permission'])){
                    $delete = Rolemodule::where('roleid', $input['id'])->delete();

                    foreach($permissions as $v){
                        $newRoleModule = new Rolemodule;
                        $newRoleModule->name = $v['name'];
                        $newRoleModule->apiname = $v['apiname'];
                        $newRoleModule->moduleid = $v['id'];
                        $newRoleModule->roleid = $input['id'];
                        $newRoleModule->is_visible = $v['is_visible'];
                        $newRoleModule->is_active = $v['is_active'];
                        $newRoleModule->site_active = $v['site_active'];
                        $newRoleModule->url = $v['url'];
                        $newRoleModule->icon = $v['icon'];
                        $newRoleModule->subpermissions = $v['subpermissions'];
                        $newRoleModule->disable_note = $v['disable_note'];
                        $newRoleModule->remark = $v['remark'];
                        $newRoleModule->type = $v['type'];
                        $newRoleModule->save();
                    }

                }
            }
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();

        return response()->json(['message' => 'Role updated successfully'],200);;
    }
    public function delete(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required|max:32',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }


        $roleData = Role::where('id', $input['id'])->first();
        if($roleData->id == CONST_ROLE_DEVELOPER ||
            $roleData->id == CONST_ROLE_SUPER_ADMIN){
            return response()->json(['message' => 'Not permitted to delete'],403);
        }

        \DB::beginTransaction();

        try{
            $delete = Role::where('id', $input['id'])->delete();
            Rolemodule::where('roleid', $input['id'])->delete();
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();
        return response()->json([$delete,'message'=>'Role deleted successfully'], 200);
    }
    public function rules($type=null,$id=null){
        $ruleArr =  array(
            'permission' => 'required',
        );

        if($type == 'update'){
            $updateRules = array();
            foreach($ruleArr as $k => $v){
                $updateRules[$k] = 'sometimes|'.$v;
            }
            $ruleArr['name'] = 'sometimes|required|unique:App\Models\Role,'.$id.'|max:32';
            $ruleArr['id'] = 'required';
            return $updateRules;
        }else{
            $ruleArr['name'] = 'required|unique:App\Models\Role|max:32';
            return $ruleArr;
        }
    }
    public function cleanupPermissions($permissions){
        $filteredArr = array();
        foreach($permissions as $v){

            if($v['status'] == true){
                if(isset($v['subpermissions'])){
                    $filteredArr[] = $v;
                }else{
                    $v['subpermissions'] = [];
                    $filteredArr[] = $v;
                }

            }
        }
        return $filteredArr;
    }
}
