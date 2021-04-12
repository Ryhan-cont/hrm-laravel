<?php

namespace App\Http\Controllers\app\masterdata;

use App\Http\Controllers\Controller;
use App\Models\LeaveApplication;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Classes\Tools;

use App\Models\Employee;

use App\Models\Masterpackage;
use App\Models\Leavepackage;
use App\Models\Prefix;
use App\Models\Company;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class LeavePackageController extends Controller
{
    public function data(){
        $authUser = Auth::user();

        $leaveBaseData = leavepackage::where('companyid', $authUser->companyid)->get();

        $leaveType = array();
        foreach($leaveBaseData as $v){
            if(isset($v['type'])){$leaveType[] = $v['type'];}
        }
        $leaveType = array_values(array_unique($leaveType));

        $leaveData = Tools::arrayGroup($leaveBaseData, 'sourceid');

        $masterData = Masterpackage::where('type' , CONST_LEAVE_PACKAGE)->where('companyid', $authUser->companyid)->get();
        $leavePackage = array();
        foreach($masterData as $v){
            if(isset($leaveData[$v['id']])){$v['leave'] = $leaveData[$v['id']];}else{$v['leave'] = array();}
            $leavePackage[]=$v;
        }

        $result = array(
            'leaveType' =>$leaveType,
            'leavePackage' => $leavePackage,
        );
        return response()->json($result, 200);
    }
    public function addPrefix(){

    }
    public function create(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'packageTitle' => 'required|max:64',
            'leaveData.*.type' => 'required',
            'leaveData.*.balance' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }


        $authUser = Auth::user();
        \DB::beginTransaction();

        try{

            $masterPackage = new Masterpackage;
            $masterPackage->name = $input['packageTitle'];
            if(isset($input['comment'])){$masterPackage->comment = $input['comment'];}
            $masterPackage->type = CONST_LEAVE_PACKAGE;
            $masterPackage->companyid = $authUser->companyid;

            $registerMasterPackage = $masterPackage->save();

            foreach($input['leaveData'] as $v){
                $leavePackage = new Leavepackage;

                $leavePackage->type = $v['type'];
                $leavePackage->balance = $v['balance'];

                $leavePackage->companyid = $authUser->companyid;
                $leavePackage->sourceid = $masterPackage->id;

                $registerLeavePackage = $leavePackage->save();
            }

        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
        \DB::commit();
        return response()->json([
            $registerMasterPackage,
            'message' => 'Leave package created successfully.'
        ], 200);

    }
    public function update(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'packageTitle' => 'sometimes|required|max:64',
            'id' => 'required',
            'leaveData.*.type' => 'required',
            'leaveData.*.balance' => 'required|integer',
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }

        $authUser = Auth::user();
        \DB::beginTransaction();

        try{

            $masterPackage = array();
            if(isset($input['packageTitle'])){$masterPackage['name'] = $input['packageTitle'];}
            if(isset($input['comment'])){$masterPackage['comment'] = $input['comment'];}


            $update = Masterpackage::where('id', $input['id'])->update($masterPackage);
            $delete = Leavepackage::where('sourceid', $input['id'])->delete();

            foreach($input['leaveData'] as $v){
                $leavePackage = new Leavepackage;

                $leavePackage->type = $v['type'];
                $leavePackage->balance = $v['balance'];

                $leavePackage->companyid = $authUser->companyid;
                $leavePackage->sourceid = $input['id'];

                $registerLeavePackage = $leavePackage->save();
            }

        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
        \DB::commit();
        return response()->json([
            $update,
            'message' => "Payroll package updated successfully"
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
        $authUser = Auth::user();

        $masterData = Masterpackage::where('id', $input['id'])->first();

        if($masterData->companyid != $authUser->companyid){
            return response()->json(['message' => 'Invalid request (unauthorized)'],403);
        }

        $emp = Employee::where('leavepackage',$input['id'])->count();
        if ($emp > 0){
            return response()->json([
                'message' => "This asset is used for ".$emp." employee(s).",
            ], 406);

        }

        $delete = Masterpackage::where('id', $input['id'])->delete();
        $deleteLeave = Leavepackage::where('sourceid', $input['id'])->delete();
        return response()->json([
            $delete,
            'message'=>"Leave package deleted successfully."
        ], 200);
    }

}
