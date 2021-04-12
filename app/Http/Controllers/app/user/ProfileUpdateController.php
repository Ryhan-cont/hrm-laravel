<?php

namespace App\Http\Controllers\app\user;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Educationhistory;

use App\Models\EmployeeDocument;

use App\Models\Employee;
use App\Models\Jobhistory;
use App\Models\Nominee;
use App\Models\Role;
use App\Models\Skillmatrice;
use App\Models\User;
use App\Models\Userrestriction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileUpdateController extends Controller
{
    public function EditEducation(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);
        $authUser = auth()->user();
        $user_id = (int)decryptId($input['id']);
        $edu_id = (int)decryptId($input['edu_id']);
        $target_user = Educationhistory::find($edu_id);
        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }
        $data = [];
        if (isset($input['degree_name'])) {
            $data['degreename'] = $input['degree_name'];
        }
        if (isset($input['institute_name'])) {
            $data['institutename'] = $input['institute_name'];
        }
        if (isset($input['passing_year'])) {
            $data['passingyear'] = $input['passing_year'];
        }
        if (isset($input['degree_type'])) {
            $data['resulttype'] = $input['degree_type'];
        }


        if (isset($input['result']['cgpa']) && $input['result']['cgpa'] != null) {
            $data['cgpa'] = $input['result']['cgpa'];
        }
        if (isset($input['result']['outof']) && $input['result']['outof'] != null) {
            $data['outof'] = $input['result']['outof'];
        }
        if (isset($input['result']['division']) && $input['result']['division'] != null) {
            $data['division'] = $input['result']['division'];
        }


        //Only education attachment name create
        if ($request->file('Attachment')) {
            $encrypted_certificateAttachment = Str::random(16);
            $target_certificateAttachment = $request->file('Attachment');
            $fileExt = $target_certificateAttachment->getClientOriginalExtension();
            $certificateAttachment_name = $encrypted_certificateAttachment . '.' . $fileExt;
            $data['certificateattachment'] = $certificateAttachment_name;
        }


        try {
            $update = Educationhistory::where('id', $edu_id)->update($data);

            //education attachment Store
            if ($update && $request->file('Attachment')) {
                //Store Path

                $filePath = 'public/company-' . $authUser->companyid . '/user-' . $user_id . '/document';
                Storage::delete($filePath . '/' . $target_user->certificateattachment);
                $target_certificateAttachment->storeAs($filePath, $certificateAttachment_name);
            }
            return response()->json([
                'message' => 'Education history created successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }


    }

    public function JobHistoryUpdate(Request $request)
    {

         $job_id = (int)decryptId($request->job_id);
        $target_user = Jobhistory::find($job_id);
        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }
        $jobHistory = [];

        if (isset($request->org_name)) {
            $jobHistory ['orgname'] = $request->org_name;
        }
        if (isset($request->designation)) {
            $jobHistory ['designation'] = $request->designation;
        }
        if (isset($request->duration['start'])) {
            $jobHistory ['jobstartdate'] =  Carbon::createFromDate($request->duration['start']);
        }
        if (isset($request->duration['end'])) {
            $jobHistory ['jobclosedate'] =  Carbon::createFromDate($request->duration['end']);
        }
        if (isset($request->responsibility)) {
            $jobHistory ['responsibility'] = $request->responsibility;
        }


        try {
            Jobhistory::where('id', $job_id)->update($jobHistory);
            return response()->json([
                'message' => 'Job history created successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function NomineeUpdate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);
        $authUser = auth()->user();

        $nominee_id =  (int)decryptId($input['nominee_id']);
        $user_id = (int)decryptId($input['user_id']);
        $target_user = Nominee::find($nominee_id);
        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }
        $nominee = [];

            $nominee ['familymembername'] = $input['data']['familymembername'];
            $nominee ['relationshiptype'] = $input['relation_type'];
            $nominee ['phone_number'] = $input['data']['phone_number'];
            $nominee ['birth_date'] = Carbon::createFromDate($input['data']['birth_date']);
            $nominee ['is_nominee'] = $input['data']['is_nominee'];
            if ($input['data']['is_nominee'] != true){
                $nominee ['share'] = null;
            }else{
                $nominee ['share'] = $input['data']['share'];
            }


        //Only nominee attachment name create
        if ($request->hasFile('Attachment')) {
            $encrypted_nomineeIdAttachment = Str::random(16);
            $target_nomineeIdAttachment = $request->file('Attachment');
            $fileExt = $target_nomineeIdAttachment->getClientOriginalExtension();
            $nomineeIdAttachment_name = $encrypted_nomineeIdAttachment . '.' . $fileExt;
            $nominee ['verificationidfile'] = $nomineeIdAttachment_name;
        }

        try {
            $registerNominee = Nominee::where('id', $nominee_id)->update($nominee);
            if ($registerNominee && $request->hasFile('Attachment')) {
                $filePath = 'public/company-' . $authUser->companyid . '/user-' . $user_id . '/document';
                Storage::delete($filePath . '/' . $target_user->verificationidfile);
                $target_nomineeIdAttachment->storeAs($filePath, $nomineeIdAttachment_name);
            }
            return response()->json([
                'message' => "Nominee updated successfully."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

    }

    public function SkillUpdate(Request $request)
    {
        $skill = [];
        $skill_id = (int)decryptId($request->skill_id);
        $target_user = Skillmatrice::find($skill_id);
        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }
        if (isset($request->skill)) {
            $skill ['skillsname'] = $request->skill;
        }
        if (isset($request->scale)) {
            $skill ['skillsscale'] = $request->scale;
        }

        try {
            Skillmatrice::where('id', $skill_id)->update($skill);
            return response()->json([
                'message' => 'Skill updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

    }

    public function EmployeeDocumentUpdate(Request $request)
    {

        $input = $request->all();
        $input = json_decode($input['data'], true);
        $authUser = auth()->user();
        $user_id = (int)decryptId($input['id']);
        $doc_id = (int)decryptId($input['doc_id']);
        $target_user = EmployeeDocument::find($doc_id);
        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }
        $document = [];
        if ($request->hasFile('Attachment')) {
            $encrypted_documentAttachment = Str::random(16);
            $target_documentAttachment = $request->file('Attachment');
            $fileExt = $target_documentAttachment->getClientOriginalExtension();
            $documentAttachment_name = $encrypted_documentAttachment . '.' . $fileExt;
        }
        if (isset($input['type'])) {
            $document ['document_title'] = $input['type'];
        }
        if (isset($input['doc']['document_info'])) {
            $document ['document_info'] = $input['doc']['document_info'];
        }
        if (isset($documentAttachment_name)) {
            $document ['document_attachment'] = $documentAttachment_name;
        }

        try {
            $update = EmployeeDocument::where('id', $doc_id)->update($document);
            if ($update) {
                if ($request->hasFile('Attachment')) {
                    $filePath = 'public/company-' . $authUser->companyid . '/user-' . $user_id . '/document';
                    Storage::delete($filePath . '/' . $target_user->document_attachment);
                    $target_documentAttachment->storeAs($filePath, $documentAttachment_name);
                }
                return response()->json([
                    'message' => 'Employee document updated successfully',
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function generalInfoUpdate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);
        $user_id = (int)decryptId($input['id']);
        $target_user = Employee::where('userid', $user_id)->first();

        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }
        $data = [];
        if (isset($input['personal_number'])) {
            $data['personalmobile'] = $input['personal_number'];
        }
        if (isset($input['personal_email'])) {
            $data['personalemail'] = $input['personal_email'];
        }
        if (isset($input['work_number'])) {
            $data['officemobile'] = $input['work_number'];
        }
        if (isset($input['date_of_birth'])) {
            $data['dateofbirth'] = Carbon::createFromDate($input['date_of_birth']);
        }
        if (isset($input['gender'])) {
            $data['gender'] = $input['gender'];
        }
        if (isset($input['blood'])) {
            $data['bloodgroup'] = $input['blood'];
        }
        if (isset($input['marital_status'])) {
            $data['meritalstatus'] = $input['marital_status'];
        }
        if (isset($input['religion'])) {
            $data['religion'] = $input['religion'];
        }
        if (isset($input['nationality'])) {
            $data['nationality'] = $input['nationality'];
        }
        try {
            $update = Employee::where('userid', $user_id)->update($data);
            return response()->json([
                $update,
                'updateData' => $input,
                'message' => "General information updated successfully.",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }


    }

    public function packageUpdate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);
        $user_id = (int)decryptId($input['id']);
        $target_user = Employee::where('userid', $user_id)->first();
        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }
        $data = [];
            $data['designation'] = $input['designation'];
            $data['jobdescription'] = $input['jobDescription'];
            $data['payrollpackage'] = $input['payRoll'];
            $data['leavepackage'] = $input['leavePackage'];
            $data['assetpackage'] = $input['assetPackage'];
            $data['employeetype'] = $input['employeeType'];

                if ($input['contract_date']['start'] != "" && $input['contract_date']['start'] != ""){
                    $data['contract_start_date'] = date('Y-m-d', strtotime($input['contract_date']['start']));
                    $data['contract_end_date'] = date('Y-m-d', strtotime($input['contract_date']['end']));
                }else{
                    $data['contract_start_date'] =null;
                    $data['contract_end_date'] =null;
                }

        try {
            $update = Employee::where('userid', $user_id)->update($data);
            return response()->json([
                $update,
                'updateData' => $input,
                'message' => "Package updated successfully.",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

    }

    public function basicInfoUpdate(Request $request)
    {
        $input = $request->all();

        $input = json_decode($input['data'], true);
        $user_id = (int)decryptId($input['id']);
        $authData = auth()->user();
        $targetUser = User::find($user_id);

        $targetCompany = Company::find($authData->companyid);
        if (!$targetCompany && $authData->roleid != CONST_ROLE_DEVELOPER) {

            return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
        }

        $permissionDataUpdate = true;
        if ($authData->roleid != CONST_ROLE_SUPER_ADMIN ||
            $authData->roleid != CONST_ROLE_DEVELOPER) {

            if ($authData->companyid != $targetUser->companyid) {
                return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
            }
            if (isset($input['role_id'])) {
                if ($input['role_id'] == CONST_ROLE_DEVELOPER ||
                    $input['role_id'] == CONST_ROLE_SUPER_ADMIN) {
                    return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
                }
                if ($targetCompany->adminid == $targetUser->id) {
                    unset($input['role_id']);
                    unset($input['roleid']);
                    $permissionDataUpdate = false;
                }
            }
        }


        if ($targetUser->roleid == CONST_ROLE_DEVELOPER ||
            $targetUser->roleid == CONST_ROLE_SUPER_ADMIN) {
            unset($input['role_id']);
            unset($input['roleid']);
            $permissionDataUpdate = false;
        }


        $permission = false;
        if ($authData->id != $targetUser->id) {
            if ($authData->roleid == CONST_ROLE_COMPANY_ADMIN ||
                $authData->roleid == CONST_ROLE_SUPER_ADMIN ||
                $authData->roleid == CONST_ROLE_DEVELOPER
            ) {
                $permission = true;
            }
        } else {
            $permission = true;
        }

        if (!$permission) {
            return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
        }


        \DB::beginTransaction();

        try {

            $data = array();
            if (isset($input['first_name'])) {
                $data['first_name'] = $input['first_name'];
            }
            if (isset($input['last_name'])) {
                $data['last_name'] = $input['last_name'];
            }
            if ($authData->id < CONST_ROLE_USER) {
                if (isset($input['email'])) {
                    $data['email'] = $input['email'];
                    $data['username'] = $input['email'];
                }
                if (isset($input['role'])) {
                    $data['roleid'] = $input['role'];
                }
                if (isset($input['emp_id'])) {
                    Employee::where('userid', $user_id)->update([
                        'emp_id' => $input['emp_id']
                    ]);
                }
            }
            if (isset($input['phone'])) {
                $data['phone'] = $input['phone'];
            }


            //Only Profile picture name create
            if ($request->hasFile('logoData')) {
                $encrypted_propic = Str::random(16); //Random String
                $target_file = $request->file('logoData');
                $fileExt = $target_file->getClientOriginalExtension(); //Get Extention
                $propic_name = $encrypted_propic . '.' . $fileExt; // Concat random string and extension
                $data['propic'] = $propic_name;
                $oldpic = $targetUser->propic;
            }


            $update = User::where('id', $user_id)->update($data);
            if ($update) {
                if ($request->hasFile('logoData')) {
                    //Storing function
                    //Storing Path
                    $filePath = 'public/company-' . $authData->companyid . '/user-' . $targetUser->id;
                    //Delete old picture
                    Storage::delete($filePath . '/' . $oldpic);
                    // target_file->storeAs(path,file name);
                    $target_file->storeAs($filePath, $propic_name);
                }
           /*     if ($permissionDataUpdate) {
                    $delete = Userrestriction::where('userid', $user_id)->delete();
                    foreach ($input['permissions'] as $v) {
                         if ($v['status'] == false) {
                            $newRestriction = new Userrestriction;
                            $newRestriction->moduleid = $v['moduleid'];
                            $newRestriction->userid = $user_id;
                            $newRestriction->type = 'module';
                            $newRestriction->save();
                        } else {

                            foreach ($v['subpermissions'] as $s) {
                                if ($s['status'] == false) {
                                    $newRestriction = new Userrestriction;
                                    $newRestriction->moduleid = $v['moduleid'];
                                    $newRestriction->userid = $user_id;
                                    $newRestriction->subpermission = $s['name'];
                                    $newRestriction->type = 'subpermission';
                                    $newRestriction->save();
                                }
                            }
                        }
                    }
                }*/


            }

        } catch (Exception $e) {
            // \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();


        return response()->json([
            $update,
            'message' => "Basic information updated successfully.",
        ], 200);
    }

    public function addressUpdate(Request $request)
    {
        $user_id = (int)decryptId($request->id);

        $target_user = Employee::where('userid', $user_id)->first();

        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }
        $data = [];
        if (isset($request->per_a_line1)) {
            $data['permanentaddressline1'] = $request->per_a_line1;
        }
        if (isset($request->per_a_line2)) {
            $data['permanentaddressline2'] = $request->per_a_line2;
        }
        if (isset($request->per_city)) {
            $data['permanent_address_city'] = $request->per_city;
        }
        if (isset($request->per_country)) {
            $data['permanent_address_country'] = $request->per_country;
        }
        if (isset($request->per_province)) {
            $data['permanent_address_province'] = $request->per_province;
        }
        if (isset($request->per_post_code)) {
            $data['permanentaddresspostcode'] = $request->per_post_code;
        }

        if (isset($request->pre_a_line1)) {
            $data['presentaddressline1'] = $request->pre_a_line1;
        }
        if (isset($request->pre_a_line2)) {
            $data['presentaddressline2'] = $request->pre_a_line2;
        }
        if (isset($request->pre_city)) {
            $data['present_address_city'] = $request->pre_city;
        }
        if (isset($request->pre_country)) {
            $data['present_address_country'] = $request->pre_country;
        }
        if (isset($request->pre_province)) {
            $data['present_address_province'] = $request->pre_province;
        }
        if (isset($request->pre_post_code)) {
            $data['presentaddresspostcode'] = $request->pre_post_code;
        }

        try {
            $update = Employee::where('userid', $user_id)->update($data);
            return response()->json([
                $update,
                'message' => "Address updated successfully.",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

    }

    public function TreeUpdate(Request $request)
    {
        $user_id = (int)decryptId($request->id);
        $target_user = Employee::where('userid', $user_id)->first();
        if (!$target_user) {
            return response()->json([
                'message' => "Action cannot be performed"
            ], 406);
        }

        try {
            $update = Employee::where('userid', $user_id)->update([
                'organizationtree' => $request->organization_id,
            ]);
            return response()->json([
                $update,
                'message' => "Organization tree updated successfully.",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
