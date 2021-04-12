<?php

namespace App\Http\Controllers\app\masterdata;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Classes\Tools;

use App\Models\Employee;

use App\Models\Masterpackage;
use App\Models\Jobdescription;
use App\Models\Prefix;
use App\Models\Company;

use App\Models\DropdownItem;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class JobDescriptionController extends Controller
{
    public function data(){
        $authUser = Auth::user();

        $skillscale = DropdownItem::where('dropdown_id', CONST_DD_SKILL_SCALES)->whereIn('companyid',[0,$authUser->companyid])->get();

        $skillBaseData = Jobdescription::where('companyid', $authUser->companyid)->get();

        $jobSkill = array();

        foreach($skillBaseData as $v){
            if(isset($v['skill'])){$jobSkill[] = $v['skill'];}
        }
        $jobSkill = array_values(array_unique($jobSkill));


        $skillData = Tools::arrayGroup($skillBaseData, 'sourceid');
        $masterData = Masterpackage::where('type' , CONST_JOB_DESC)->where('companyid', $authUser->companyid)->get();
        $jobDescription = array();
        foreach($masterData as $v){
            if(isset($skillData[$v['id']])){$v['skills'] = $skillData[$v['id']];}else{$v['skills'] = array();}
            $jobDescription[]=$v;
        }

        $result = array(
            'jobSkill' => $jobSkill,
            'skillScale' => $skillscale,
            'jobDescription' => $jobDescription,
        );
        return response()->json($result, 200);
    }
    public function addPrefix(){

    }
    public function create(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'jobTitle' => 'required|max:64',
            'keyResponsibilities' => 'required|max:64',
            'skillData.*.skill' => 'required',
            'skillData.*.scale' => 'required',
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
            $masterPackage->name = $input['jobTitle'];
            $masterPackage->comment = $input['keyResponsibilities'];
            $masterPackage->type = CONST_JOB_DESC;
            $masterPackage->companyid = $authUser->companyid;

            $registerMasterPackage = $masterPackage->save();

            foreach($input['skillData'] as $v){
                $jobDescription = new Jobdescription;

                $jobDescription->skill = $v['skill'];
                $jobDescription->scale = $v['scale'];

                $jobDescription->companyid = $authUser->companyid;
                $jobDescription->sourceid = $masterPackage->id;

                $registerJobDescription = $jobDescription->save();
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
            'message' => 'Job description added successfully'
        ], 200);
    }

    public function update(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'jobTitle' => 'sometimes|required|max:64',
            'keyResponsibilities' => 'sometimes|required|max:64',
            'id' => 'required',
            'skillData.*.skill' => 'required',
            'skillData.*.scale' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }


        $authUser = Auth::user();
        $srcData = Masterpackage::where('id', $input['id'])->first();

        if($srcData->companyid != $authUser->companyid){
            return response()->json([
                'message' => 'Invalid request (unauthorized)'
            ],403);
        }


        \DB::beginTransaction();

        try{

            $masterPackage = array();
            if(isset($input['jobTitle'])){$masterPackage['name'] = $input['jobTitle'];}
            if(isset($input['keyResponsibilities'])){$masterPackage['comment'] = $input['keyResponsibilities'];}

            $update = Masterpackage::where('id', $input['id'])->update($masterPackage);


            $delete = Jobdescription::where('sourceid', $input['id'])->delete();
            foreach($input['skillData'] as $v){
                $jobDescription = new Jobdescription;

                $jobDescription->skill = $v['skill'];
                $jobDescription->scale = $v['scale'];

                $jobDescription->companyid = $authUser->companyid;
                $jobDescription->sourceid = $input['id'];

                $registerJobDescription = $jobDescription->save();
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
            'message'=>"Job description updated successfully"
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
            return response()->json([
                'message' => 'Invalid request (unauthorized)'
            ],403);
        }

        $emp = Employee::where('jobdescription',$input['id'])->count();
        if ($emp > 0){
            return response()->json([
                'message' => "This asset is used for ".$emp." employee(s).",
            ], 406);

        }

        $delete = Masterpackage::where('id', $input['id'])->delete();
        $deleteJobDescription = Jobdescription::where('sourceid', $input['id'])->delete();
        return response()->json([
            $delete,
            'message' => "Job description deleted successfully"
        ], 200);
    }
}
