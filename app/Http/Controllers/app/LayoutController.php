<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Menumodule;
use Illuminate\Support\Facades\Auth;
use App\Classes\Modules;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class LayoutController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }

    public function menu(){
        $auth_user = Auth::user();

        unset(Auth::user()->password);

        $menuData = Menumodule::where('menuname', $auth_user->menuformet)->get();
        $roleModulesData = Modules::getRoleModules();

        //dd($roleModulesData);
        $roleModules = array();
        foreach($roleModulesData as $v){
            $roleModules[$v['moduleid']]=$v;
        }
        $newMenuData = array();
        foreach($menuData as $v){
            if($v['rowtype'] == 'group'){
                $newMenuData[$v['rowid']]= array(
                    'header' => $v['name'],
                    'icon' => $v['icon'],
                    'i18n' => $v['name'],
                    'items' => array(),
                );
            }
        }
        foreach($menuData as $v){
            $rowidArr = explode('-',$v['rowid']);
            if(count($rowidArr)==2){
                if($v['rowtype'] == 'btn'){
                    if(isset($roleModules[$v['moduleid']]) || $auth_user->roleid == CONST_ROLE_DEVELOPER){
                        if($v['is_visible'] == true){
                            $newMenuData[$rowidArr[0]]['items'][$rowidArr[1]]=array(
                                'icon' => $v['icon'],
                                'name' => $v['name'],
                                'i18n' => $v['name'],
                                'slug' => $v['name'],
                                'url' => $v['url'],
                            );
                        }
                    }
                }else if($v['rowtype'] == 'subgroup'){
                    $newMenuData[$rowidArr[0]]['items'][$rowidArr[1]]=array(
                        'name' => $v['name'],
                        'i18n' => $v['name'],
                        'icon' => $v['icon'],
                        'module_id' => $v['moduleid'],
                        'submenu' => array(),
                    );

                }
            }

        }
        foreach($menuData as $v){
            $rowidArr = explode('-',$v['rowid']);
            if(count($rowidArr)==3){
                if($v['rowtype'] == 'btn'){
                    if(isset($roleModules[$v['moduleid']])  || $auth_user->roleid == CONST_ROLE_DEVELOPER){
                        if($v['is_visible'] == true){
                            $newMenuData[$rowidArr[0]]['items'][$rowidArr[1]]['submenu'][$rowidArr[2]]=array(
                                'icon' => $v['icon'],
                                'name' => $v['name'],
                                'i18n' => $v['name'],
                                'slug' => $v['name'],
                                'url' => $v['url'],
                                'module_id' => $v['moduleid'],

                            );
                        }
                    }
                }
            }

        }
        //dd($newMenuData);
        $newMenu = array();
        foreach($newMenuData as $v){
            if($v['header'] == null || $v['header'] == ''){
                foreach($v['items'] as $s){
                    $newMenu[]=$s;
                }
            }else{
                $menuArr=array();
                foreach($v['items'] as $s){
                    if(isset($s['submenu'])){
                        $subMenuArr = array();
                        foreach($s['submenu'] as $sm){
                            $subMenuArr[]=$sm;
                        }
                        if(count($subMenuArr)>0){
                            $s['submenu']=$subMenuArr;
                            $menuArr[]=$s;
                        }
                    }else{
                        $menuArr[]=$s;
                    }
                }
                if(count($menuArr)>0){
                    $v['items'] = $menuArr;
                    $newMenu[]=$v;
                }
            }
        }

        $user_info = DB::table('users as u')
            ->join('roles as r', 'r.id', '=', 'u.roleid')
            ->select('u.id', DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as full_name"),
                'u.first_name', 'u.last_name', 'u.username', 'u.email', 'u.phone', 'u.propic', 'u.status', 'u.address',
                'u.roleid', 'u.packageid', 'u.companyid', 'u.menuformet', 'u.designation',
                'r.name as role_name'
            )
            ->where('u.id', Auth::user()->id)
            ->first();
        if ($user_info->propic != null) {
            $user_info->propic_url = '/storage/company-' . $user_info->companyid . '/user-' . $auth_user->id . '/' . $user_info->propic;
        } else {
            $user_info->propic_url = '/storage/default/propic.jpg';
        }
        $user_info->user_id = encryptId($user_info->id);

        $result = array(
            'user' => $user_info,
            'menu' => $newMenu,
        );

        return response()->json($result, 200);

    }
}
