<?php

namespace App\Http\Controllers\app\user;

use App\Classes\Modules;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DummyDataController;
use App\Models\City;
use App\Models\Country;
use App\Models\DropdownItem;
use App\Models\Masterpackage;
use App\Models\Packagemodule;
use App\Models\Province;
use App\Models\Role;
use App\Models\Rolemodule;
use App\Models\User;
use App\Models\Userrestriction;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalink;
use phpDocumentor\Reflection\Types\Void_;

class ProfileController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }

    public function role()
    {
        $rolesInfo = Role::select("id as value", "name as label")
            ->whereNotIn('id', [CONST_ROLE_DEVELOPER, CONST_ROLE_SUPER_ADMIN, CONST_ROLE_COMPANY_ADMIN])
            ->get();

        return response()->json([
            'role' => $rolesInfo,
        ], 200);
    }

    public function roleData(Request $request)
    {


        $restrictionData = Userrestriction::where('userid', $request->user_id)->get();

        $restrictionTracker = array();
        foreach ($restrictionData as $v) {
            $restrictionTracker[$v['moduleid']][$v['subpermission']] = $v['subpermission'];
        }
        //$packageData = Modules::getPackageData();
        $packageData = Packagemodule::where('packageid', Auth::user()->packageid)->get();
        $packageModules = Arr::pluck($packageData, 'subpermissions', 'moduleid');
        $rolaData = Rolemodule::where('roleid', $request->id)->get();

        $roles = array();
        foreach ($rolaData as $v) {
            if (isset($packageModules[$v['moduleid']])) {
                $subpermissionsArr = array();
                foreach ($packageModules[$v['moduleid']] as $p) {
                    if ($p['status'] == true) {
                        if (isset($restrictionTracker[$v['moduleid']][$p['name']])) {
                            $p['status'] = false;
                        }
                        $subpermissionsArr[] = $p;
                    }
                }
                $v['subpermissions'] = $subpermissionsArr;
                $v['status'] = true;
                $roles[] = $v;
            }
        }


        return response()->json([
            'roleData' => $roles,
        ], 200);
    }

    /**
     * User's basic/general information
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function basicInfo($id)
    {
        $userData = auth()->user();

        $response = [];
        $user_id = stripcslashes(strip_tags((int)decryptId($id)));
        $user_info = DB::table('users as u')
            ->leftJoin('companies as c', 'c.id', '=', 'u.companyid')
            ->leftJoin('employees as e', 'e.userid', '=', 'u.id')
            ->leftJoin('roles as r', 'u.roleid', '=', 'r.id')
            ->select(DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as full_name"),
                'u.first_name', 'u.last_name', 'r.name as user_type', 'u.roleid',
                'u.username', 'u.email', 'u.phone', 'u.propic', 'u.status', 'u.address',
                'c.name as company_name', 'e.emp_id', 'u.id'
            )
            ->where('u.id', $user_id)
            ->first();

        $user_info->enc_user_id = encryptId($user_id);
        if ($user_info->propic != null) {
            $user_info->propic_url = '/storage/company-' . $userData->companyid . '/user-' . $user_id . '/' . $user_info->propic;

        } else {
            $user_info->propic_url = '/storage/default/propic.jpg';
        }
        $roles = Modules::getRoleModules();


        if (!is_null($user_info)) {
            $user_info->status = ($user_info->status == 1) ? 'Active' : 'Inactive';

            //$user_info->role = $rolesInfo;
            $user_info->roleData = $roles;
            $response['user_info'] = $user_info;
            $response['message'] = 'Successfully fetched user info';
            $response['errors'] = [];
            return response()->json($response, 200);
        } else {
            $response['user_info'] = $user_info;
            $response['message'] = 'No User data found for this request';
            $response['errors'] = [];
            return response()->json($response, 204);
        }
    }

    /**
     * Get the User's organization information
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function orgInfo($id)
    {
        $response = [];
        $user_id = (int) stripcslashes(strip_tags(decryptId($id)));
        //DB::enableQueryLog(); // Enable query log
        $org_info = DB::table('employees as e')
            ->join('dropdown_items as dd', 'dd.id', '=', 'e.designation')
            ->join('dropdown_items as dd1', 'dd1.id', '=', 'e.employeetype')
            ->join('masterpackages as mp', 'mp.id', '=', 'e.leavepackage')
            ->join('masterpackages as mp1', 'mp1.id', '=', 'e.jobdescription')
            ->join('masterpackages as mp2', 'mp2.id', '=', 'e.payrollpackage')
            ->join('masterpackages as mp3', 'mp3.id', '=', 'e.assetpackage')
            ->select('dd.name as designation', 'dd1.name as employee_type', 'mp.name as leave_package',
               'e.employeetype as employee_type_id','e.designation as designation_id','e.leavepackage as leave_package_id',
                'e.jobdescription as job_description_id','e.payrollpackage as payroll_package_id','e.assetpackage as asset_package_id',
                'mp1.name as job_description', 'mp2.name as payroll_package',
                'mp3.name as asset_package', 'e.contract_start_date', 'e.contract_end_date'

            )
            ->where('e.userid', $user_id)
            ->first();

        //dd(DB::getQueryLog()); // Show results of log
        $range = 'Contract date is not available';
        $contract = false;
        if (isset($org_info->employee_type_id)){
            if ($org_info->employee_type_id == CONST_EMPLOYEE_CONTRACTUAL){
                $contract = true;
                if ($org_info->contract_start_date){
                    $start = date("j F, Y",strtotime($org_info->contract_start_date));
                    $end = date("j F, Y",strtotime($org_info->contract_end_date));
                    $range = $start.' to '.$end;
                }

            }
        }


        if (!is_null($org_info)) {

            $response['org_info'] = $org_info;
            $response['contract_info'] = [
              'is_contract' => $contract,
                'start_date' =>  $org_info->contract_start_date,
                'end_date' =>  $org_info->contract_end_date,
                'range' => $range,
            ];
            $response['message'] = 'Successfully fetched Organization info';
            $response['errors'] = [];
            return response()->json($response, 200);
        } else {
            $response['org_info'] = $org_info;
            $response['message'] = 'No Organization data found for this request';
            $response['errors'] = [];
            return response()->json($response, 404);
        }

    }

    /**
     * Change/Update the user's password
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {

        $response = [];
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|max:255|min:6',
            'confirm_new_password' => 'same:new_password|max:255|min:6',
        ]);

        // check if validator fails...
        if ($validator->fails()) {
            $response['data'] = [];
            $response['status'] = 400;
            $response['errors'] = $validator->errors();
            $response['message'] = 'Input data is not valid, please check and try again.';

            return response()->json($response, 400);
        }

        $old_password = auth()->user()->password;

        if (Hash::check($request->old_password, $old_password)) {
            User::find(auth()->user()->id)->update(['password' => Hash::make($request->new_password)]);

            $response['errors'] = [];
            $response['message'] = 'Password change successful.';
            return response()->json($response, 200);
        } else {
            $response['errors'] = [];
            $response['message'] = 'Old password does not match.';
            return response()->json($response, 401);
        }
    }

    /**
     * Get the user's General Information
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function generalInfo($id)
    {

        $user_id = stripcslashes(strip_tags((int)decryptId($id)));

        $response = [];
        //DB::enableQueryLog(); // Enable query log
        $general_info = DB::table('employees as e')
            ->leftJoin('cities as ct', 'e.permanent_address_city', 'ct.id')
            ->leftJoin('cities as ct1', 'e.present_address_city', 'ct1.id')
            ->leftJoin('provinces as pr', 'e.permanent_address_province', 'pr.id')
            ->leftJoin('provinces as pr1', 'e.present_address_province', 'pr1.id')
            ->leftJoin('countries as co', 'e.permanent_address_country', 'co.id')
            ->leftJoin('countries as co1', 'e.present_address_country', 'co1.id')
            ->leftJoin('dropdown_items as dd', 'dd.id', '=', 'e.bloodgroup')
            ->leftJoin('dropdown_items as dd1', 'dd1.id', '=', 'e.nationality')
            ->leftJoin('dropdown_items as dd2', 'dd2.id', '=', 'e.gender')
            ->leftJoin('dropdown_items as dd3', 'dd3.id', '=', 'e.religion')
            ->leftJoin('dropdown_items as dd4', 'dd4.id', '=', 'e.meritalstatus')
            ->select('e.personalemail', 'e.officeemail', 'e.personalmobile', 'e.officemobile',
                DB::raw("CONCAT(e.verificationidnumber,' (',e.verificationidtype, ')') AS verify_id"),
                'ct.name as permanent_address_city', 'pr.name as permanent_address_province', 'co.name as permanent_address_country',
                'ct.id as permanent_address_city_id', 'pr.id as permanent_address_province_id', 'co.id as permanent_address_country_id',
                'co1.name as present_address_country', 'ct1.name as present_address_city', 'pr1.name as present_address_province',
                'co1.id as present_address_country_id', 'ct1.id as present_address_city_id', 'pr1.id as present_address_province_id',
                'e.presentaddresspostcode', 'e.permanentaddresspostcode',
                DB::raw("CONCAT(e.presentaddressline1,' ',e.presentaddressline2) AS present_address"),
                DB::raw("CONCAT(e.permanentaddressline1,' ',e.permanentaddressline2) AS permanent_address"),
                'e.permanentaddressline1', 'e.permanentaddressline2', 'e.presentaddressline1', 'e.presentaddressline2',
                'e.verificationidfile', 'e.dateofbirth', 'e.companyid', 'e.userid', 'e.meritalstatus', 'dd4.name as marital_status', 'dd4.id as marital_id', 'e.verificationidtype',
                'e.verificationidnumber', 'dd.name as blood_group', 'dd.id as blood_id', 'dd1.name as nationality', 'dd1.id as nationality_id',
                'dd2.name as gender', 'dd2.id as gender_id', 'dd3.name as religion', 'dd3.id as religion_id')
            ->where('e.userid', $user_id)->first();
        //dd(DB::getQueryLog()); // Show results of log

        if ($general_info) {

            if ($general_info->dateofbirth != null) {
                $response['formatted_date'] = date("j F, Y",strtotime($general_info->dateofbirth));
            } else {
                $response['formatted_date'] = '';
            }
        }else{
            return response()->json([
                'message' => 'No general information found for this request'
            ],404);
        }
        $response['user_id'] = $id;
        if (!is_null($general_info)) {
            $general_info->verification_file_path = "/storage/company-" . $general_info->companyid . "/user-" . $general_info->userid . "/document";
            $response['general_info'] = $general_info;
            $response['message'] = 'Successfully fetched General info';
            $response['errors'] = [];
            return response()->json($response, 200);
        } else {
            $response['general_info'] = $general_info;
            $response['message'] = 'No General data found for this request';
            $response['errors'] = [];
            return response()->json($response, 204);
        }
    }

    /**
     * Get the user's Educational information
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function eduInfo($id)
    {
        $user_id = stripcslashes(strip_tags((int)decryptId($id)));

        //$education_history = Educationhistory::where('userid', $user_id)->get();
        $education_history = DB::table('educationhistories as ed')
            ->leftJoin('dropdown_items as dd1', 'ed.degreename', 'dd1.id')
            ->leftJoin('dropdown_items as dd3', 'ed.institutename', 'dd3.id')
            ->leftJoin('dropdown_items as dd2', 'ed.division', 'dd2.id')
            ->where('ed.userid', $user_id)
            ->select('ed.*', 'dd1.name as degree_name', 'dd3.name as institute_name_for_id', 'dd1.id as degree_id', 'ed.id as edu_id', 'dd2.name as division_results', 'dd2.id as division_id')
            ->get();
        $education = [];

        foreach ($education_history as $edu) {
            $type = $edu->resulttype;
            if ($type == "CGPA") {
                $result = ['cgpa' => $edu->cgpa,
                    'out_of' => $edu->outof,
                ];
            } else {
                $result = [
                    'division' => $edu->division_results,
                    'division_id' => $edu->division_id,
                ];
            }
            if (is_numeric($edu->institutename)) {
                $institute_name = $edu->institute_name_for_id;
            } else {
                $institute_name = $edu->institutename;
            }

            array_push($education, [
                'edu_id' => encryptId($edu->edu_id),
                'degree_name' => $edu->degree_name,
                'degree_id' => $edu->degree_id,
                'institute_info' => $edu->institutename,
                'institute_name' => $institute_name,
                'passing_year' => $edu->passingyear,
                'result_type' => $type,
                'result' => $result,
                'attachment_name' => $edu->certificateattachment,
                'attachment_link' => '/storage/company-' . $edu->companyid . '/user-' . $edu->userid . '/document/' . $edu->certificateattachment,
            ]);
        }

        if (!empty($education)) {
            return response()->json(['education_info' => $education], 200);
        } else {
            return response()->json(['message' => 'Education history is not available.'], 404);
        }
    }

    /**
     * Get the User's Job History
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function jobHistory($id)
    {
        $response = [];
        $user_id = stripcslashes(strip_tags((int)decryptId($id)));

        //DB::enableQueryLog(); // Enable query log
        $job_histories = DB::table('jobhistories as jh')
            ->join('dropdown_items as dd', 'dd.id', '=', 'jh.designation')
            ->select('dd.name as designation', 'dd.id as designation_id',
                DB::raw("CONCAT(DATE_FORMAT(jh.`jobstartdate`, '%d-%b-%Y'), ' - ', DATE_FORMAT(jh.`jobclosedate`, '%d-%b-%Y')) AS job_duration"),
                'jh.orgname', 'jh.responsibility', 'jh.skill', 'jh.jobstartdate', 'jh.jobclosedate', 'jh.id as job_id')
            ->where('jh.userid', $user_id)->get();
        //dd(DB::getQueryLog()); // Show results of log
        if ($job_histories->isNotEmpty()) {
            $info = [];
            foreach ($job_histories as $job) {
                array_push($info, [
                    "designation" => $job->designation,
                    "designation_id" => $job->designation_id,
                    "job_duration" => $job->job_duration,
                    "orgname" => $job->orgname,
                    "responsibility" => $job->responsibility,
                    "skill" => $job->skill,
                    "jobstartdate" =>$job->jobstartdate,
                    "jobclosedate" => $job->jobclosedate,
                    "job_id" => encryptId($job->job_id),
                ]);
            }

            $response['job_histories'] = $info;
            $response['message'] = 'Successfully fetched Job History';
            $response['errors'] = [];
            return response()->json($response, 200);
        } else {
            return response()->json([
                'message' => 'No job history data found for this request',
            ], 404);
        }

    }

    /**
     * Get the User's Nominee Information
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function nomineeInfo($id)
    {
        $response = [];
        $nominees = [];
        $user_id = stripcslashes(strip_tags((int)decryptId($id)));
        //DB::enableQueryLog(); // Enable query log
        $nominee_info = DB::table('nominees as n')
            ->leftJoin('dropdown_items as dd', 'dd.id', '=', 'n.relationshiptype')
            ->select('n.*', 'dd.name')
            ->where('n.userid', $user_id)
            ->get();

        //dd(DB::getQueryLog()); // Show results of log

        if ($nominee_info->isNotEmpty()) {
            $total_percnet = 0;
            foreach ($nominee_info as $ni) {

                if($ni->birth_date){
                    $b_date = $ni->birth_date;
                    $f_b_date = date("j F, Y",strtotime($ni->birth_date));
                }else{
                    $b_date = null;
                    $f_b_date = null;
                }

                array_push($nominees, [
                        'is_nominee' =>  $ni->is_nominee,
                        'relation' => $ni->name,
                        'type_id' => $ni->relationshiptype,
                        'nominee_id' => encryptId($ni->id),
                        'nominee_name' => $ni->familymembername,
                        'nominee_share' => $ni->share,
                        'phone_number' => $ni->phone_number,
                        'nominee_birth_date' => $b_date,
                        'formatted_birth_date' => $f_b_date,
                        'attachment_name' => $ni->verificationidfile,
                        'file_path' => "/storage/company-" . $ni->companyid . "/user-" . $ni->userid . "/document/" . $ni->verificationidfile,
                    ]
                );

                $total_percnet = $total_percnet + $ni->share;
            }

            $response['nominees'] = $nominees;
            $response['message'] = 'Successfully fetched Nominee';
            $response['share_data'] = [
                'total_percent' => $total_percnet,
                'available_percent' => 100 - $total_percnet,
            ];
            $response['errors'] = [];
            return response()->json($response, 200);
        } else {

            return response()->json([
                'message' =>  'No Nominee data found for this request',
            ], 404);
        }

    }

    /**
     * Get the User's Skill Matrix
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function skillMatrix($id)
    {
        $response = [];
        $user_id = stripcslashes(strip_tags((int)decryptId($id)));
        //DB::enableQueryLog(); // Enable query log
        $skills = DB::table('skillmatrices as sm')
            ->join('dropdown_items as dd', 'dd.id', '=', 'sm.skillsname')
            ->join('dropdown_items as dd1', 'dd1.id', '=', 'sm.skillsscale')
            ->select('dd.name as skill_name', 'dd.id as skill_id', 'dd1.name as skill_scale', 'dd1.id as scale_id', 'sm.id')
            ->where('sm.userid', $user_id)
            ->get();


        //dd(DB::getQueryLog()); // Show results of log

        if ($skills->isNotEmpty()) {
            $info = [];
            foreach ($skills as $skill) {
                array_push($info, [
                    "skill_name" => $skill->skill_name,
                    "skill_id" => $skill->skill_id,
                    "skill_scale" => $skill->skill_scale,
                    "scale_id" => $skill->scale_id,
                    "id" => encryptId($skill->id),
                ]);
            }


            $response['skills'] = $info;
            $response['message'] = 'Successfully fetched Skills';
            $response['errors'] = [];
            return response()->json($response, 200);
        } else {
            return response()->json([
                'message' => 'No Skill data found for this request',
            ], 404);
        }

    }

    /**
     * Get the User's Skill Matrix
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function employeeDocs($id)
    {
        $user_id = stripcslashes(strip_tags((int)decryptId($id)));


        $documents = DB::table('employee_documents as ed')
            ->leftJoin('dropdown_items as dd', 'ed.document_title', 'dd.id')
            ->select('ed.id as doc_id', 'ed.document_info as doc_info', 'ed.user_id', 'ed.company_id', 'dd.name as document_title', 'dd.id as document_value', 'ed.document_attachment')
            ->where('user_id', $user_id)
            ->get();

        $employee_docs = [];

        foreach ($documents as $doc) {

            array_push($employee_docs, [
                'document_id' => encryptId($doc->doc_id),
                'document_title' => ['label' => $doc->document_title, 'value' => $doc->document_value],
                'document_info' => $doc->doc_info,
                'attachment_name' => $doc->document_attachment,
                'attachment_link' => '/storage/company-' . $doc->company_id . '/user-' . $doc->user_id . '/document/' . $doc->document_attachment,
            ]);
        }

        if (!empty($employee_docs)) {
            return response()->json([
                'employee_documents' => $employee_docs,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Employee document is not available.',
            ], 404);
        }
    }


    public function PackageData()
    {
        $authUser = auth()->user();
        $masterPackage = Masterpackage::select('id as value', 'name as label', 'type')
            ->where('companyid', $authUser->companyid)
            ->orderBy('id', 'desc')
            ->get();
        $assetPackage = [];
        $leaveData = [];
        $jobDescriptionData = [];
        $payrollData = [];


        foreach ($masterPackage as $master) {
            if ($master->type == CONST_LEAVE_PACKAGE) {
                array_push($leaveData, $master);
            }
            if ($master->type == CONST_ASSET_PACKAGE) {
                array_push($assetPackage, $master);
            }
            if ($master->type == CONST_JOB_DESC) {
                array_push($jobDescriptionData, $master);
            }
            if ($master->type == CONST_PAYROLL_PACKAGE) {
                array_push($payrollData, $master);
            }
        }


        $allDropdownData = DB::table('dropdown_items as d1')
            ->where('d1.companyid', 0)
            ->orWhere('d1.companyid', $authUser->companyid)
            ->select('d1.id as value', 'd1.name as label', 'd1.dropdown_id')
            ->get();

        $designationData = [];
        $employeeTypeData = [];
        $relationshipData = [];
        $skillData = [];
        $skillScaleData = [];
        $docTypes = [];

        foreach ($allDropdownData as $drop) {
            if ($drop->dropdown_id == CONST_DD_DESIGNATIONS) {
                array_push($designationData, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_EMPLOYEE_TYPES) {
                array_push($employeeTypeData, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_RELATIONSHIP_TYPES) {
                array_push($relationshipData, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_SKILLS) {
                array_push($skillData, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_SKILL_SCALES) {
                array_push($skillScaleData, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_DOCUMENT_TYPES) {
                array_push($docTypes, $drop);
            }


        }


        return response()->json([
            'leaveData' => $leaveData,
            'assetData' => $assetPackage,
            'payrollData' => $payrollData,
            'jobDescriptionData' => $jobDescriptionData,
            'designationData' => $designationData,
            'employeeTypeData' => $employeeTypeData,
            'relationData' => $relationshipData,
            'skillNames' => $skillData,
            'skillScales' => $skillScaleData,
            'documentTypes' => $docTypes,
        ], 200);
    }

    public function GenDropdown()
    {
        $authUser = auth()->user();
        $allDropdownData = DropdownItem::select('id', 'dropdown_id', 'name as label')
            ->where('companyid', 0)
            ->orWhere('companyid', $authUser->companyid)
            ->get();

        $gender = [];
        $bloodGroup = [];
        $Religion = [];
        $marital = [];
        $nationality = [];
        foreach ($allDropdownData as $drop) {

            if ($drop->dropdown_id == CONST_DD_GENDERS) {
                array_push($gender, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_BLOOD_GROUPS) {
                array_push($bloodGroup, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_RELIGIONS) {
                array_push($Religion, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_MARITAL_STATUS) {
                array_push($marital, $drop);
            }
            if ($drop->dropdown_id == 'nationality') {
                array_push($nationality, $drop);
            }
        }


        return response()->json([

            'gender' => $gender,
            'bloodGroup' => $bloodGroup,
            'religion' => $Religion,
            'marital' => $marital,
            'nationality' => $nationality,
        ], 200);
    }

    public function EducationData()
    {
        $authUser = auth()->user();
        $allDropdownData = DropdownItem::select('id as value', 'dropdown_id', 'name as label')
            ->where('companyid', 0)
            ->orWhere('companyid', $authUser->companyid)
            ->get();

        $degreeNameData = [];
        $divisionData = [];
        $instituteData = [];
        foreach ($allDropdownData as $drop) {
            if ($drop->dropdown_id == CONST_DD_DEGREES) {
                array_push($degreeNameData, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_DIVISION_RESULTS) {
                array_push($divisionData, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_INSTITUTES) {
                array_push($instituteData, $drop);
            }
        }
        return response()->json([
            'degreeData' => $degreeNameData,
            'divisionData' => $divisionData,
            'instituteData' => $instituteData,
        ], 200);
    }

    public function CountryData()
    {
        $country = Country::select('id as value', 'name as label')->get();
        $country[] = [
            'value' => -100,
            'label' => 'Other'
        ];
        return response()->json([
            'country' => $country,
        ]);
    }

    public function ProvinceData($id)
    {
        $province = Province::where('country_id', $id)->select('id as value', 'name as label')->get();
        $province[] = [
            'value' => -100,
            'label' => 'Other'
        ];
        return response()->json([
            'province' => $province,
        ]);
    }

    public function CityData($id)
    {
        $city = City::where('province_id', $id)->select('id as value', 'name as label')->get();
        $city[] = [
            'value' => -100,
            'label' => 'Other'
        ];
        return response()->json([
            'city' => $city,
        ]);
    }

}
