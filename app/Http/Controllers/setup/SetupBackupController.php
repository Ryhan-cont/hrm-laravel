<?php

namespace App\Http\Controllers\setup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Module;
use App\Models\Menu;
use App\Models\Menumodule;
use App\Models\Role;
use App\Models\Rolemodule;

class SetupBackupController extends Controller
{
    public function index(){

        $moduleData = Module::all();
        $modules = array();
        foreach($moduleData as $module){
            $subArr = [
                'name' => $module['name'],
                'apiname' => $module['apiname'],
                'url' => $module['url'],
                'icon' => $module['icon'],
                'subpermissions' => $module['subpermissions'],
                'visible' => $module['is_visible'],
                'active' => $module['is_active'],
                'disablenote' => $module['disable_note'],
                'remark' => $module['remark'],
                'type' => $module['type'],
            ];
            $modules[]=$subArr;
        }
        $menuData = Menu::all();
        $menus = array();
        foreach($menuData as $menu){
            $subArr = [
                'name' => $menu['name'],
            ];
            $menus[]=$subArr;
        }

        $menuModuleData = Menumodule::all();
        $menuModules = array();
        foreach($menuModuleData as $menuModule){
            $subArr = [
                'name' => $menuModule['name'],
                'moduleid' => $menuModule['moduleid'],
                'menuname' => $menuModule['menuname'],
                'menuid' => $menuModule['menuid'],
                'visible' => $menuModule['visible'],
                'active' => $menuModule['active'],
                'url' => $menuModule['url'],
                'icon' => $menuModule['icon'],
                'type' => $menuModule['type'],
                'disablenote' => $menuModule['disable_note'],
                'remark' => $menuModule['remark'],
                'rowtype' => $menuModule['rowtype'],
                'rowid' => $menuModule['rowid'],
            ];
            $menuModules[]=$subArr;
        }

        $roleModuleData = Rolemodule::all();
        $roleModules = array();
        foreach($roleModuleData as $roleModule){
            $subArr = [
                'name' => $roleModule['name'],
                'apiname' => $roleModule['apiname'],
                'moduleid' => $roleModule['moduleid'],
                'roleid' => $roleModule['roleid'],
                'visible' => $roleModule['visible'],
                'active' => $roleModule['active'],
                'url' => $roleModule['url'],
                'icon' => $roleModule['icon'],
                'type' => $roleModule['type'],
                'subpermissions' => $roleModule['subpermissions'],
                'disablenote' => $roleModule['disablenote'],
                'remark' => $roleModule['remark'],
            ];
            $roleModules[]=$subArr;
        }



        
        dd($modules);

    }
}
