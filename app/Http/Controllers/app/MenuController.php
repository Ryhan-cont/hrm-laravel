<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Module;
use App\Models\Menu;
use App\Models\Menumodule;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data(){
        $module = Module::all();
        $menus = Menu::all();

        $menuButtons=array();
        foreach($module as $v){
            $v['rowtype']='btn';
            $menuButtons[]=$v;
        }


        $idTracker = array();
        foreach($menus as $v){
            $idTracker[$v['name']] = $v['id'];
        }

        $result = array();
        $result['menus']=$menus;
        $result['buttons']=$menuButtons;
        $result['idTracker']=$idTracker;
        return response()->json($result, 200);
    }

    public function menuData(Request $request){
        $input = $request->all();
        $menuData = Menumodule::where('menuid', $input['id'])->get();
        $newMenuData = array();
        foreach($menuData as $v){
            if($v['rowtype'] == 'group'){
                $newMenuData[$v['rowid']]= array(
                    'name' => $v['name'],
                    'type' => $v['rowtype'],
                    'icon' => $v['icon'],
                    'list' => array(),
                );
            }
        }
        foreach($menuData as $v){
            $rowidArr = explode('-',$v['rowid']);
            if(count($rowidArr)==2){
                if($v['rowtype'] == 'btn'){
                    $newMenuData[$rowidArr[0]]['list'][$rowidArr[1]]=array(
                        'disable_note' => $v['disable_note'],
                        'icon' => $v['icon'],
                        'id' => $v['moduleid'],
                        'is_active' => $v['is_active'],
                        'is_visible' => $v['is_visible'],
                        'name' => $v['name'],
                        'remark' => $v['remark'],
                        'site_active' => $v['site_active'],
                        'type' => $v['type'],
                        'rowtype' => $v['rowtype'],
                        'url' => $v['url'],
                    );
                }else if($v['rowtype'] == 'subgroup'){
                    $newMenuData[$rowidArr[0]]['list'][$rowidArr[1]]=array(
                        'name' => $v['name'],
                        'type' => $v['rowtype'],
                        'icon' => $v['icon'],
                        'rowtype' => $v['rowtype'],
                        'list' => array(),
                    );
                }                
            }

        }
        foreach($menuData as $v){
            $rowidArr = explode('-',$v['rowid']);
            if(count($rowidArr)==3){
                if($v['rowtype'] == 'btn'){
                    $newMenuData[$rowidArr[0]]['list'][$rowidArr[1]]['list'][$rowidArr[2]]=array(
                        'name' => $v['name'],
                        'icon' => $v['icon'],
                        'url' => $v['url'],
                        'id' => $v['moduleid'],
                        'is_active' => $v['is_active'],
                        'is_visible' => $v['is_visible'],
                        'site_active' => $v['site_active'],
                        'remark' => $v['remark'],
                        'type' => $v['type'],
                        'rowtype' => $v['rowtype'],
                        'disable_note' => $v['disable_note'],

                    );
                }               
            }

        }
        $newMenu = array();
        foreach($newMenuData as $v){
            if(isset($v['list'])){
                $listArray = array();
                foreach($v['list'] as $ldt){
                    if($ldt['rowtype']=='btn'){
                        $listArray[]=$ldt;
                    }else if($ldt['rowtype']=='subgroup'){
                        if(isset($ldt['list'])){
                            $subgroupList = array();
                            foreach($ldt['list'] as $sldt){
                                $subgroupList[]=$sldt;
                            }
                        }
                        $ldt['list']=$subgroupList;
                        $listArray[]=$ldt;
                    }
                }
                $v['list']=$listArray;
            }
            $newMenu[]=$v;
        }
        return response()->json($newMenu, 200);
    }

    public function create(Request $request){
        $newMenu = new Menu;
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|unique:App\Models\Menu|regex:/^[a-z-]+$/u|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        foreach($input as $k => $v){
            $newMenu->$k = $v;
        }
        $register = $newMenu->save();
        return response()->json([
            $register,
            'message' => "Menu created successfully"
        ], 200);
    }

    public function update(Request $request){
        $input = $request->all();
       

        $validator = Validator::make($input, [
            'id' => 'required|max:32',
            'name' => 'required|unique:App\Models\Menu,name,'.$input['id'].'|regex:/^[a-z-]+$/u|max:32',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        \DB::beginTransaction();

        $moduleData = Module::all();
        $module = array();
        foreach($moduleData as $v){
            $module[$v['id']]=$v;
        }

        try{
            $data = array();
            $data['name']=$input['name'];
            $update = Menu::where('id', $input['id'])->update($data);

            if($update){
                Menumodule::where('menuid', $input['id'])->delete();
                foreach($input['data'] as $k => $v){
                    $newMenuModule = new Menumodule;
                    $newMenuModule->rowtype = 'group';
                    $newMenuModule->menuname = $input['name'];
                    $newMenuModule->rowid = $k;
                    $newMenuModule->name = $v['name'];
                    $newMenuModule->icon = $v['icon'];
                    $newMenuModule->menuid = $input['id'];
                    $newMenuModule->save();
                    foreach($v['list'] as $lk => $lv){
                        if($lv['rowtype'] == 'btn'){
                            if(isset($module[$lv['id']])){
                                $button = $module[$lv['id']];
                            }else{
                                return response()->json(['message' => 'Invalid button id'],422);
                            }
                            $buttonData = $module[$lv['id']];
                            $newMenuModule = new Menumodule;
                            $newMenuModule->rowtype = 'btn';
                            $newMenuModule->name = $button['name'];
                            $newMenuModule->rowid = $k.'-'.$lk;
                            $newMenuModule->moduleid = $lv['id'];
                            $newMenuModule->menuid = $input['id'];
                            $newMenuModule->menuname = $input['name'];
                            $newMenuModule->is_visible = $button['is_visible'];
                            $newMenuModule->is_active = $button['is_active'];
                            $newMenuModule->site_active = $button['site_active'];
                            $newMenuModule->url = $button['url'];
                            $newMenuModule->icon = $button['icon'];
                            $newMenuModule->type = $button['type'];
                            $newMenuModule->disable_note = $button['disable_note'];
                            $newMenuModule->remark = $button['remark'];
                            $newMenuModule->save();
                        }else if($lv['rowtype'] == 'subgroup'){
                            $newMenuModule = new Menumodule;
                            $newMenuModule->rowtype = 'subgroup';
                            $newMenuModule->menuname = $input['name'];
                            $newMenuModule->rowid = $k.'-'.$lk;
                            $newMenuModule->name = $lv['name'];
                            $newMenuModule->icon = $lv['icon'];
                            $newMenuModule->menuid = $input['id'];
                            $newMenuModule->save();
                            if(isset($lv['list'])){
                                foreach($lv['list'] as $lsk => $lsv){
                                    if($lsv['rowtype'] == 'btn'){
                                        if(isset($module[$lsv['id']])){
                                            $button = $module[$lsv['id']];
                                        }else{
                                            return response()->json(['message' => 'Invalid button id'],422);
                                        }
                                        $newMenuModule = new Menumodule;
                                        $newMenuModule->rowtype = 'btn';
                                        $newMenuModule->name = $button['name'];
                                        $newMenuModule->rowid = $k.'-'.$lk.'-'.$lsk;
                                        $newMenuModule->moduleid = $lsv['id'];
                                        $newMenuModule->menuid = $input['id'];
                                        $newMenuModule->menuname = $input['name'];
                                        $newMenuModule->is_visible = $button['is_visible'];
                                        $newMenuModule->is_active = $button['is_active'];
                                        $newMenuModule->site_active = $button['site_active'];
                                        $newMenuModule->url = $button['url'];
                                        $newMenuModule->icon = $button['icon'];
                                        $newMenuModule->type = $button['type'];
                                        $newMenuModule->disable_note = $button['disable_note'];
                                        $newMenuModule->remark = $button['remark'];
                                        $newMenuModule->save();
                                    }
                                }
                            }
                        }
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
            'message' => "Menu updated successfully"
        ], 200);
    }

    public function delete(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        \DB::beginTransaction();

        try{
            $delete = Menu::where('id', $input['id'])->delete();
            Menumodule::where('menuid', $input['id'])->delete();
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['message' => $e->getMessage()],500);
        }
        \DB::commit();
        return response()->json([
            $delete,
            'message' => "Menu deleted successfully"
        ], 200);
    }

}
