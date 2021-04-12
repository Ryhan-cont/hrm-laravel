<?php

namespace App\Http\Controllers\app\masterdata;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Classes\Tools;

use App\Models\Employee;

use App\Models\Masterpackage;
use App\Models\Payrollpackage;
use App\Models\Prefix;
use App\Models\Company;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class PayrollPackageController extends Controller
{
    public function data(){
        $authUser = Auth::user();

        $payrollBaseData = payrollpackage::where('companyid', $authUser->companyid)->get();

        $payrollHead = array();
        foreach($payrollBaseData as $v){
            if(isset($v['head'])){$payrollHead[] = $v['head'];}
        }
        $payrollHead = array_values(array_unique($payrollHead));
        $payrollData = Tools::arrayGroup($payrollBaseData, 'sourceid');

        $masterData = Masterpackage::where('type', CONST_PAYROLL_PACKAGE)->where('companyid', $authUser->companyid)->get();
        $payrollPackage = array();
        foreach($masterData as $v){
            if(isset($payrollData[$v['id']])){
                $total =0;
                foreach($payrollData[$v['id']] as $p){
                    $total=$total+$p['amount'];
                }
                $v['payroll'] = $payrollData[$v['id']];
                $v['total'] = $total;
            }else{$v['payroll'] = array();$v['total'] = 0;}
            $payrollPackage[]=$v;
        }

        $result = array(
            'payrollHead' =>$payrollHead,
            'payrollPackage' => $payrollPackage,
        );
        return response()->json($result, 200);
    }
    public function addPrefix(){

    }
    public function create(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'packageTitle' => 'required|max:64',
            'payrollData.*.head' => 'required',
            'payrollData.*.amount' => 'required|integer',
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
            $masterPackage->type = CONST_PAYROLL_PACKAGE;
            $masterPackage->companyid = $authUser->companyid;

            $registerMasterPackage = $masterPackage->save();

            foreach($input['payrollData'] as $v){
                $payroll = new Payrollpackage;

                $payroll->head = $v['head'];
                $payroll->amount = $v['amount'];

                $payroll->companyid = $authUser->companyid;
                $payroll->sourceid = $masterPackage->id;

                $registerJobDescription = $payroll->save();
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
            'message' => "Payroll created successfully"
        ], 200);
    }

    public function update(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'packageTitle' => 'sometimes|required|max:64',
            'id' => 'required',
            'payrollData.*.head' => 'required',
            'payrollData.*.amount' => 'required|integer',
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

            $delete = Payrollpackage::where('sourceid', $input['id'])->delete();
            foreach($input['payrollData'] as $v){
                $payroll = new Payrollpackage;

                $payroll->head = $v['head'];
                $payroll->amount = $v['amount'];

                $payroll->companyid = $authUser->companyid;
                $payroll->sourceid = $input['id'];

                $registerJobDescription = $payroll->save();
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
            'message' => "Payroll updated successfully.",
        ], 200);


    }
    public function delete(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }
        $authUser = Auth::user();

        $masterData = Masterpackage::where('id', $input['id'])->first();

        if($masterData->companyid != $authUser->companyid){
            return response()->json(['error' => 'Invalid request (unauthorized)'],403);
        }

        $emp = Employee::where('payrollpackage',$input['id'])->count();
        if ($emp > 0){
            return response()->json([
                'message' => "This asset is used for ".$emp." employee(s).",
            ], 406);

        }

        $delete = Masterpackage::where('id', $input['id'])->delete();
        $deletePayroll = Payrollpackage::where('sourceid', $input['id'])->delete();
        return response()->json([
            $delete,
            'message'=>"Payroll deleted successfully"
        ], 200);
    }
}
