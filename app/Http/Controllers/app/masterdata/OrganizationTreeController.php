<?php

namespace App\Http\Controllers\app\masterdata;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Classes\Tools;

use App\Models\Organization;
use App\Models\Organizationtree;
use App\Models\Company;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class OrganizationTreeController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }
    public $untieTree = array();


    public function data(Request $request){

        $target_user = Employee::where('userid',(int)decryptId($request->id))->first();
        if (isset($target_user->organizationtree)){
            $selectedId = $target_user->organizationtree;
        }else{
            $selectedId = null;
        }


        $authUser = Auth::user();

        $organizationtreeData = DB::table('organizations as org')
            ->leftJoin('dropdown_items as rcCode', 'rcCode.id', '=', 'org.rccode')
            ->leftJoin('dropdown_items as type', 'type.id', '=', 'org.type')
            ->leftJoin('users as user', 'user.id', '=', 'org.organizationhead')
            ->leftJoin('organizationtrees as tree', 'tree.organizationid', '=', 'org.id')
            ->select(DB::raw("TRIM(CONCAT(user.first_name,' ',IFNULL(user.last_name, ''))) as organizationhead"),
                DB::raw("TRIM(CONCAT(org.name ,' - ', user.first_name,' ',IFNULL(user.last_name, '') )) as text"),
                'rcCode.name as rccode', 'type.name as type','org.name as name','org.id as organizationid', 'tree.id as id',
                'tree.serial as serial',DB::raw('IFNULL(tree.serial, "undefined") as savedas'),
                'org.organizationhead as organizationheadid'

            )
            ->where('org.companyid', $authUser->companyid)
            ->get();

        //dd($selectedId);
        $savedPrimatyOrganizationCount = count($organizationtreeData);
        for($i=0; count($organizationtreeData)>$i; $i++){
            if($organizationtreeData[$i]->serial == null){
                $organizationtreeData[$i]->serial=$savedPrimatyOrganizationCount++;
            }

            if($selectedId != null && $selectedId == $organizationtreeData[$i]->organizationid){
                $organizationtreeData[$i]->selected = true;
            }else{
                $organizationtreeData[$i]->selected = false;
            }
        }


        $organizationtreeData = json_decode(json_encode($organizationtreeData), true);

        $organizationTree = $this->tie($organizationtreeData);
        $result = $this->reload($organizationTree);

        return response()->json($result, 200);
    }

    public function update(Request $request){

        $input = $request->all();
        $validator = Validator::make($input, [
            'organizationList' => 'required',
        ]);
        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }


        $count = 1;
        $newListArr = array();
        foreach($input['organizationList'] as $v){
            $subArr = $v;
            $subArr['serial'] = $count.'';
            $this->untieTree[]=$subArr;
            if(count($v['children'])>0){ $this->unTie($v['children'],$count);}
            $count++;
        }


        $authUser = Auth::user();

        \DB::beginTransaction();


        //dd($this->untieTree);
        try{
            foreach($this->untieTree as $v){
                if($v['savedas'] == 'undefined'){
                    $organizationTree = new Organizationtree;
                    $organizationTree->name='';
                    $organizationTree->serial=$v['serial'];
                    $organizationTree->type='';
                    $organizationTree->rccode='';
                    $organizationTree->organizationid=$v['organizationid'];
                    $organizationTree->organizationhead=$v['organizationheadid'];
                    $organizationTree->companyid=$authUser->companyid;
                    $register = $organizationTree->save();
                }else{
                    $organizationTree = array();
                    $organizationTree['serial'] = $v['serial'];
                    $register = Organizationtree::where('id', $v['id'])->update($organizationTree);
                }

            }

        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
        \DB::commit();
        return response()->json([
            $register,
            'message' => "Organization tree updated successfully"
        ], 200);

    }

    public function unTie($arr,  $serial){
        $count=0;
        foreach($arr as $v){
            $subArr = $v;
            $subArr['serial'] = $serial.'-'.$count;
            $this->untieTree[]=$subArr;
            if(count($v['children'])>0){ $this->unTie($v['children'],$serial.'-'.$count);}
            $count++;
        }
    }

    public function tie($arr){
        $result = array();
        foreach($arr as $v){
            $seArr = explode('-',$v['serial']);
            $serArrCount = count(explode('-',$v['serial']));
            $tmpArray = &$result;

            while(count($seArr)>0){
                $k = array_shift($seArr);

                if(!is_array($tmpArray)){
                    $tmpArray = array();
                }
                if($serArrCount==1 || count($seArr)==0){
                    $tmpArray = &$tmpArray[$k];
                    if(isset($tmpArray['children'])){
                        $children = $tmpArray['children'];
                        $tmpArray = array(
                            'name' => $v['name'],
                            'text' => $v['name'].' - '. $v['organizationhead'], //$v['text'],
                            'rccode' => $v['rccode'],
                            'type' => $v['type'],
                            'organizationid' => $v['organizationid'],
                            'organizationhead' => $v['organizationhead'],
                            'organizationheadid' => $v['organizationheadid'],
                            'id' => $v['id'],
                            'selected' => $v['selected'],
                            'serial' => $v['serial'],
                            'savedas' => $v['savedas'],
                            'children' => $children,
                        );
                    }else{
                        $tmpArray = $v;
                    }

                }else{
                    $tmpArray = &$tmpArray[$k]['children'];
                }
            }

        }
        return $result;
    }

    public function reload($arr){
        ksort($arr);
        $result = array();
        foreach($arr as $v){
            if(isset($v['children'])){
                if(count($v['children'])>0){
                    ksort($v['children']);
                    $v['children']=$this->reload($v['children']);
                }else{
                    $v['children']=array();
                }
            }else{
                $v['children']=array();
            }
            if(isset($v['name'])){
                $subArr = array(
                    'name' => $v['name'],
                    'text' => $v['name'].' - '. $v['organizationhead'], //$v['text'],
                    'type' => $v['type'],
                    'rccode' => $v['rccode'],
                    'organizationid' => $v['organizationid'],
                    'organizationhead' => $v['organizationhead'],
                    'organizationheadid' => $v['organizationheadid'],
                    'id' => $v['id'],
                    'selected' => $v['selected'],
                    "opened" => true,
                    "icon" => "fa fa-building icon-state-default",
                    'savedas' => $v['savedas'],
                    'children' => $v['children'],
                );
                $result[]=$subArr;
            }else{
                if(count($v['children'])>0){
                    ksort($v['children']);
                    foreach($v['children'] as $deletedGroupData){
                        $subArr = array(
                            'name' => $deletedGroupData['name'],
                            'text' => $deletedGroupData['text'],
                            'type' => $deletedGroupData['type'],
                            'rccode' => $deletedGroupData['rccode'],
                            'organizationid' => $deletedGroupData['organizationid'],
                            'organizationhead' => $deletedGroupData['organizationhead'],
                            'organizationheadid' => $v['organizationheadid'],
                            'id' => $deletedGroupData['id'],
                            'selected' => $deletedGroupData['selected'],
                            "opened" => true,
                            "icon" => "fa fa-building icon-state-default",
                            'savedas' => $v['savedas'],
                            'children' => $deletedGroupData['children'],
                        );

                        $result[]=$subArr;
                    }
                }
            }
        }
        return $result;
    }
}
