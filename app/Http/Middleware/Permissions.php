<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

use App\Models\Module;
use App\Models\Userrestriction;
use App\Models\Rolemodule;
use App\Models\Packagemodule;
use App\Classes\Modules;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;


class Permissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        $reqPath = explode('/',$request->path());
        if($reqPath[0]=='api'){
            if($reqPath[1] == 'site'){return $next($request);}
            if(Auth::check()){

                $userid = Auth::user()->id;
                // $role_id = Auth::user()->roleid;
                $roleid = Auth::user()->roleid;
                $packageId = Auth::user()->packageid;


                // $roleData = Rolemodule::where('roleid', $roleid)->get();
                // $packageData = Packagemodule::where('packageid', $packageId)->get();
                // $restriction = Userrestriction::where('userid', $userid)->get();

                if($roleid == CONST_ROLE_DEVELOPER || $roleid == CONST_ROLE_SUPER_ADMIN){

                    $roleData = DB::table('modules as module')
                    ->join('rolemodules as role', function ($join) use ($roleid) {
                        if($roleid != CONST_ROLE_DEVELOPER){
                            $join->on('role.moduleid', '=', 'module.id')
                            ->where('role.roleid', '=', $roleid);
                        }
                    })
                    ->select(
                        'module.subpermissions as userRestriction',
                        'module.subpermissions as packageSubpermissions',
                        'role.subpermissions as roleSubpermissions',
                        'module.subpermissions as moduleSubpermissions',
                        'module.id as moduleid',
                        'module.name as name',
                        'module.url as url',
                        'module.icon as icon',
                        'module.apiname as apiname',
                        'module.is_visible as is_visible',
                        'module.is_active as is_active',
                        'module.type as type',
                        'module.module_group as module_group',
                    )
                    ->get();
                }else{
                    $roleData = DB::table('packagemodules as package')
                    ->join('rolemodules as role', function ($join) use ($roleid) {
                        $join->on('role.moduleid', '=', 'package.moduleid')
                        ->where('role.roleid', '=', $roleid);
                    })
                    ->leftJoin('userrestrictions as user',  function ($join) use ($userid) {
                        $join->on('role.moduleid', '=', 'user.moduleid')
                        ->where('user.id', '=', $userid);
                    })
                    ->leftJoin('modules as module', 'package.moduleid', '=', 'module.id')
                    ->select(
                        'user.subpermission as userRestriction',
                        'package.subpermissions as packageSubpermissions',
                        'role.subpermissions as roleSubpermissions',
                        'module.subpermissions as moduleSubpermissions',
                        'package.moduleid as moduleid',
                        'module.name as name',
                        'module.url as url',
                        'module.icon as icon',
                        'module.apiname as apiname',
                        'module.is_visible as is_visible',
                        'module.is_active as is_active',
                        'module.type as type',
                        'module.module_group as module_group',
                    )
                    ->where('package.packageid', $packageId)
                    ->get();
                }

                //dd($roleData);

                $roles =array();
                foreach($roleData as $v){
                    if($v->userRestriction == null){$userRestriction = array();}else{$userRestriction = $this->makeObject(json_decode($v->userRestriction, true),'name');}
                    if($v->packageSubpermissions == null){$packageSubpermissions = array();}else{$packageSubpermissions = $this->makeObject(json_decode($v->packageSubpermissions,true),'name');}
                    if($v->roleSubpermissions == null){$roleSubpermissions = array();}else{$roleSubpermissions = $this->makeObject(json_decode($v->roleSubpermissions,true),'name');}
                    if($v->moduleSubpermissions == null){$moduleSubpermissions = array();}else{$moduleSubpermissions = $this->makeObject(json_decode($v->moduleSubpermissions,true),'name');}
                    if($roleid == CONST_ROLE_DEVELOPER || $roleid == CONST_ROLE_SUPER_ADMIN){
                        $v->subpermissions = $moduleSubpermissions;
                    }else{
                        $newSubPremissions = array();
                        foreach($roleSubpermissions as $key => $perm){
                            if(isset($packageSubpermissions[$key])){
                                if($packageSubpermissions[$key]['status'] == false){
                                    $perm['status'] = false;
                                }else{
                                    if($perm['status'] == true){
                                        if(isset($userRestriction[$key])){
                                            $perm['status'] = false;
                                        }
                                    }                                    
                                }
                            }else{
                                $perm['status'] = false;
                            }
                            $newSubPremissions[$key]=$perm;
                        }
                        $v->subpermissions = $newSubPremissions;
                    }
                    unset($v->userRestriction);
                    unset($v->packageSubpermissions);
                    unset($v->roleSubpermissions);
                    unset($v->moduleSubpermissions);
                    $roles[]=$v;
                }
                $roles = json_decode(json_encode($roles),true);


                //dd($roles);

                
                // $packageTracker = Arr::pluck($packageData, 'subpermissions', 'moduleid');

                
                // $restrictionTracker = array();
                // foreach($restriction as $v){
                //     $restrictionTracker[$v['moduleid']][$v['subpermission']]=$v['subpermission'];
                // }



                // $permissionsArr = array();
                // foreach ($roleData as $v){
                //     if(isset($packageTracker[$v['moduleid']]) ||
                //         $role_id == CONST_ROLE_DEVELOPER ||
                //         $role_id == CONST_ROLE_SUPER_ADMIN){
                //         $subpermissionsArr = array();
                //         if($role_id != CONST_ROLE_DEVELOPER &&
                //             $role_id != CONST_ROLE_SUPER_ADMIN){
                //             if(isset($packageTracker[$v['moduleid']])){
                //                 foreach($packageTracker[$v['moduleid']] as $p){
                //                     if($p['status'] == true && !isset($restrictionTracker[$v['moduleid']][$p['name']])){
                //                         $subpermissionsArr[$p['name']]=$p['title'];
                //                     }
                //                 }
                //             }
                //         }else{
                //             foreach($v['subpermissions'] as $p){
                //                 if($p['status'] == true){
                //                     $subpermissionsArr[$p['name']]=$p['title'];
                //                 }
                //             }
                //         }
                //         $v['subpermissions'] = $subpermissionsArr;
                //         $permissionsArr[]=$v;
                //     }
                // }

                Modules::PutRoleModules($roles);
                if($roleid == CONST_ROLE_DEVELOPER){return $next($request);}

                $generalPermission = ['data','lists','list','index','items','item'];

                if(in_array($reqPath[1], $generalPermission)){return $next($request);}

                foreach($roles as $v){
                    if($v['apiname']==$reqPath[1]){
                        Modules::putPremissions($v['subpermissions']);
                        if(!isset($reqPath[2])){return $next($request);}
                        if(in_array($reqPath[2], $generalPermission)){
                            return $next($request);
                        }else{
                            if(isset($v['subpermissions'][$reqPath[2]])){
                                if($v['subpermissions'][$reqPath[2]]['status'] ==true){
                                    return $next($request);
                                }else{
                                    return response()->json('Forbidden (You dont have permission)', 403);
                                }
                            }else{
                                //dd($v);
                                return response()->json('Forbidden (No subpermissions found)', 403);
                            }
                        }

                    }
                }

                $permissionData = Module::where('apiname', $reqPath[1])->first();

                if($permissionData != null){
                    if($permissionData->type == '03'){
                        return $next($request);
                    }else{
                        return response()->json('Forbidden (Not a general module)', 403);
                    }
                }else{
                    return response()->json('Forbidden (No module found)', 403);
                }

            }

        }
        return $next($request);
    }
    public function makeObject($array,$thacker)
    {
        $result = array();
        foreach($array as $v){
            $result[$v[$thacker]]=$v;
        }
        return $result;
    }
}
