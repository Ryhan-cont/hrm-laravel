<?php

namespace App\Http\Controllers\app\user;

use App\Http\Controllers\Controller;
use App\Models\Educationhistory;
use App\Models\EmployeeDocument;
use App\Models\Jobhistory;
use App\Models\Nominee;
use App\Models\Skillmatrice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProfileCreateController extends Controller
{
    public  function JobHistoryCreate(Request $request){
        $authUser = auth()->user();
        $jobHistory = new Jobhistory;
        $jobHistory->orgname = $request->org_name;
        $jobHistory->designation = $request->designation;

        $jobHistory->jobstartdate = Carbon::createFromDate($request->duration['start']);
        $jobHistory->jobclosedate = Carbon::createFromDate($request->duration['end']);
        $jobHistory->responsibility = $request->responsibility;

        $jobHistory->companyid = $authUser->companyid;
        $jobHistory->userid = (int)decryptId($request->user_id);
        $registerJobHistory = $jobHistory->save();
        return response()->json([
            'message' => 'Job History Created Successfully',
        ], 200);
    }
    public function SkillCreate(Request $request){
        $authUser = auth()->user();
        $skillMatrix = new Skillmatrice;

        $skillMatrix->skillsscale =$request->scale;
        $skillMatrix->skillsname =$request->skill;

        $skillMatrix->companyid = $authUser->companyid;
        $skillMatrix->userid = (int)decryptId($request->user_id);

        $registerSkillMatrix = $skillMatrix->save();
        return response()->json([
            'message' => 'Skill Created Successfully',
        ], 200);
    }
    public function AddEducation(Request $request){
        $input = $request->all();
        $input = json_decode($input['data'], true);

        $authUser = auth()->user();
        $user_id = (int)decryptId($input['id']);
        $educationHistory = new Educationhistory;

        if (isset($input['degree_name'])) {
            $educationHistory->degreename = $input['degree_name'];
        }
        if (isset($input['institute_name'])) {
            $educationHistory->institutename = $input['institute_name'];
        }
        if (isset($input['passing_year'])) {
            $educationHistory->passingyear =  $input['passing_year'];
        }
        if (isset($input['degree_type'])) {
            $educationHistory->resulttype = $input['degree_type'];
        }


        if (isset($input['result']['cgpa']) && $input['result']['cgpa'] != null) {
            $educationHistory->cgpa = $input['result']['cgpa'];
        }
        if (isset($input['result']['outof']) && $input['result']['outof'] != null) {
            $educationHistory->outof = $input['result']['outof'];
        }
        if (isset($input['result']['division']) && $input['result']['division'] != null) {
            $educationHistory->division = $input['result']['division'];
        }

        $educationHistory->companyid = $authUser->companyid;
        $educationHistory->userid = $user_id;
        //Only education attachment name create
        if ($request->file('Attachment')) {
            $encrypted_certificateAttachment = Str::random(16);
            $target_certificateAttachment = $request->file('Attachment');
            $fileExt = $target_certificateAttachment->getClientOriginalExtension();
            $certificateAttachment_name = $encrypted_certificateAttachment . '.' . $fileExt;
            $educationHistory->certificateattachment = $certificateAttachment_name;
        }

        $registerEducationHistory = $educationHistory->save();
        //education attachment Store
        if ($registerEducationHistory && $request->file('Attachment')) {
            //Store Path
            $filePath = 'public/company-' . $authUser->companyid . '/user-' . $user_id . '/document';
            //Storing function
            // target_file->storeAs(path,file name);
            $target_certificateAttachment->storeAs($filePath, $certificateAttachment_name);
        }

        return response()->json([
            'message' => 'Education History Created Successfully',
        ], 200);
    }
    public function EmployeeDocumentCreate(Request $request){
        $input = $request->all();
        $input = json_decode($input['data'], true);
        $authUser = auth()->user();
        $user_id = (int)decryptId($input['id']);
        if ($request->hasFile('Attachment')) {
            $encrypted_documentAttachment = Str::random(16);
            $target_documentAttachment = $request->file('Attachment');
            $fileExt = $target_documentAttachment->getClientOriginalExtension();
            $documentAttachment_name = $encrypted_documentAttachment . '.' . $fileExt;

            $results =   EmployeeDocument::create([
                'company_id'=> $authUser->companyid,
                'user_id' =>$user_id,
                'document_title' => $input['type'],
                'document_info' => $input['doc']['document_info'],
                'document_attachment' => $documentAttachment_name,
            ]);
            if ($results){
                $filePath = 'public/company-' . $authUser->companyid . '/user-' . $user_id . '/document/';
                $target_documentAttachment->storeAs($filePath, $documentAttachment_name);
            }
        }
        return response()->json([
            'message' => 'Employee Document Created Successfully',
        ], 200);

    }
    public function NomineeCreate(Request $request){
        $input = $request->all();
        $input = json_decode($input['data'], true);
        $authUser = auth()->user();
        $user_id=(int)decryptId($input['userid']);
        $nominee = new Nominee;

        $nominee->familymembername = $input['data']['familymembername'];
        $nominee->relationshiptype = $input['relation_type'];
        $nominee->companyid = $authUser->companyid;
        $nominee->userid = $user_id;
        $nominee->phone_number = $input['data']['phone_number'];
        if ($input['data']['birth_date']){
            $nominee->birth_date = Carbon::createFromDate($input['data']['birth_date']);
        }else{
            $nominee->birth_date =null;
        }

        $nominee->share = $input['data']['share'];
        $nominee->is_nominee = $input['data']['is_nominee'];

        //Only nominee attachment name create
        if ($request->hasFile('Attachment')) {
            $encrypted_nomineeIdAttachment = Str::random(16);
            $target_nomineeIdAttachment = $request->file('Attachment');
            $fileExt = $target_nomineeIdAttachment->getClientOriginalExtension();
            $nomineeIdAttachment_name = $encrypted_nomineeIdAttachment . '.' . $fileExt;
            $nominee->verificationidfile = $nomineeIdAttachment_name;
        }

        $registerNominee = $nominee->save();
        if ($registerNominee && $request->hasFile('Attachment')) {

            $filePath = 'public/company-' . $authUser->companyid . '/user-' .$user_id. '/document/';

            $target_nomineeIdAttachment->storeAs($filePath, $nomineeIdAttachment_name);

        }
        return response()->json([
            'message' => "Nominee created successfully."
        ], 200);



    }
}
