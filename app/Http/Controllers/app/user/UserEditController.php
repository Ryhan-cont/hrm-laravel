<?php

namespace App\Http\Controllers\app\user;

use App\Http\Controllers\Controller;
use App\Models\EmployeeDocument;
use App\Models\Packagemodule;
use Illuminate\Http\Request;

use Illuminate\Support\Arr;
use App\Classes\Tools;

use App\Classes\Files;
use App\Classes\Modules;

use Illuminate\Http\File;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

use App\Models\Role;
use App\Models\User;
use App\Models\Userrestriction;
use App\Models\Rolemodule;

use App\Models\Company;

use App\Models\Masterpackage;
use App\Models\Leavepackage;
use App\Models\Assetpackage;
use App\Models\Payrollpackage;
use App\Models\Jobdescription;
use App\Models\DropdownItem;

use App\Models\Employee;
use App\Models\Educationhistory;
use App\Models\Jobhistory;
use App\Models\Skillmatrice;
use App\Models\Nominee;

use App\Models\Organization;
use App\Models\Organizationtree;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UserEditController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data(Request $request)
    {
        $authData = Auth::user();
        $user = User::where('id', $request->id)->first();
        $employee = Employee::where('userid', $request->id)->first();
        $educationhistory = Educationhistory::where('userid', $request->id)->get();
        $jobhistory = Jobhistory::where('userid', $request->id)->get();
        $skillmatrice = Skillmatrice::where('userid', $request->id)->get();
        $nominee = Nominee::where('userid', $request->id)->get();
        $employee_document = EmployeeDocument::where('user_id', $request->id)->get();


        $role = Role::all();

        $roleList = array();
        $roleData = array();
        foreach ($role as $v) {
            if ($v['id'] != 'Superadmin' && $v['id'] != 'Developer') {
                $roleList[] = $v['id'];
                $roleData[$v['name']] = $v;
            }
        }

        //Configure preveous role
        $restrictionData = Userrestriction::where('userid', $request->id)->get();
        $restrictionTracker = array();
        foreach ($restrictionData as $v) {
            $restrictionTracker[$v['moduleid']][$v['subpermission']] = $v['subpermission'];
        }

        //$packageData = Modules::getPackageData();
        $packageData = Packagemodule::where('packageid', Auth::user()->packageid)->get();
        $packageModules = Arr::pluck($packageData, 'subpermissions', 'moduleid');
        $rolaData = Rolemodule::where('roleid', $user->roleid)->get();

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


        //General info
        $organizationData = Organization::where('companyid', $authData->companyid)->get();
        $organizationtreeData = Organizationtree::where('companyid', $authData->companyid)->get();
        $organizationTreeArr = Tools::assignKey($organizationtreeData, 'organizationid');
        $savedPrimatyOrganizationCount = count($organizationtreeData);
        foreach ($organizationData as $v) {
            if (isset($organizationTreeArr[$v['id']])) {
                $targetData = $organizationTreeArr[$v['id']];
                $subArr = array(
                    'name' => $targetData['name'],
                    'rccode' => $targetData['rccode'],
                    'type' => $targetData['type'],
                    'organizationid' => $targetData['organizationid'],
                    'organizationhead' => $v['organizationhead'],
                    'serial' => $targetData['serial']
                );
                $fullOrganizationTree[] = $subArr;
            } else {
                $savedPrimatyOrganizationCount++;
                $subArr = array(
                    'name' => $v['name'],
                    'rccode' => $v['rccode'],
                    'type' => $v['type'],
                    'organizationid' => $v['id'],
                    'organizationhead' => $v['organizationhead'],
                    'serial' => $savedPrimatyOrganizationCount . ''
                );
                $fullOrganizationTree[] = $subArr;
            }
        }

        $organizationTree = $this->tie($fullOrganizationTree);
        $organizationTree = $this->reload($organizationTree, $employee->organizationtree);
        $masterPackage = Masterpackage::all();
        $leavePackage = $this->arrFormet($masterPackage->where('type' , CONST_LEAVE_PACKAGE), 'name');
        $assetPackage = $this->arrFormet($masterPackage->where('type' , CONST_ASSET_PACKAGE), 'name');
        $payrollPackage = $this->arrFormet($masterPackage->where('type' , CONST_JOB_DESC), 'name');
        $jobDescription = $this->arrFormet($masterPackage->where('type' , CONST_PAYROLL_PACKAGE), 'name');


        $allDropdownData = DropdownItem::all();
        $dropdown = array();
        foreach ($allDropdownData as $v) {
            $dropdown[$v['name']][] = $v;
        }

        $designation = $this->arrFormet($dropdown['designation'], 'value');
        $gender = $this->arrFormet($dropdown['gender'], 'value');
        $employeeType = $this->arrFormet($dropdown['employeetype'], 'value');
        $religion = $this->arrFormet($dropdown['religion'], 'value');
        $degree = $this->arrFormet($dropdown['degreename'], 'value');
        $division = $this->arrFormet($dropdown['division'], 'value');
        $relationshipType = $this->arrFormet($dropdown['relationshiptype'], 'value');

        $dropdown['city'][] = array('id' => 0, 'value' => 'others');
        $city = $this->arrFormet($dropdown['city'], 'value');

        $dropdown['institute'][] = array('id' => 0, 'value' => 'others');
        $institute = $this->arrFormet($dropdown['institute'], 'value');

        $skillName = $this->arrFormet($dropdown['skillname'], 'value');
        $skillScale = $this->arrFormet($dropdown['skillscale'], 'value');
        $bloodgroup = $this->arrFormet($dropdown['bloodgroup'], 'value');
        $nationality = $this->arrFormet($dropdown['nationality'], 'value');

        $result = array();
        $result['roleList'] = $roleList;
        $result['rolaData'] = $roleData;

        $result['leaveList'] = $leavePackage['list'];
        $result['leaveData'] = $leavePackage['data'];

        $result['assetList'] = $assetPackage['list'];
        $result['assetData'] = $assetPackage['data'];

        $result['payrollList'] = $payrollPackage['list'];
        $result['payrollData'] = $payrollPackage['data'];

        $result['jobDescriptionList'] = $jobDescription['list'];
        $result['jobDescriptionData'] = $jobDescription['data'];

        $result['designationList'] = $designation['list'];
        $result['designationData'] = $designation['data'];

        $result['employeeTypeList'] = $employeeType['list'];
        $result['employeeTypeData'] = $employeeType['data'];

        $result['genderList'] = $gender['list'];
        $result['genderData'] = $gender['data'];

        $result['religionList'] = $religion['list'];
        $result['religionData'] = $religion['data'];

        $result['degreeList'] = $degree['list'];
        $result['degreeData'] = $degree['data'];

        $result['divisionList'] = $division['list'];
        $result['divisionData'] = $division['data'];

        $result['relationshipTypeList'] = $relationshipType['list'];
        $result['relationshipTypeData'] = $relationshipType['data'];

        $result['cityList'] = $city['list'];
        $result['cityData'] = $city['data'];

        $result['instituteList'] = $institute['list'];
        $result['instituteData'] = $institute['data'];

        $result['skillNameList'] = $skillName['list'];
        $result['skillNameData'] = $skillName['data'];

        $result['skillScaleList'] = $skillScale['list'];
        $result['skillScaleData'] = $skillScale['data'];

        $result['bloodgroupList'] = $bloodgroup['list'];
        $result['bloodgroupData'] = $bloodgroup['data'];

        $result['nationalityList'] = $nationality['list'];
        $result['nationalityData'] = $nationality['data'];

        $result['organizationTree'] = $organizationTree;

        $result['employee'] = $employee;
        $result['educationhistory'] = $educationhistory;
        $result['jobhistory'] = $jobhistory;
        $result['skillmatrice'] = $skillmatrice;
        $result['nominee'] = $nominee;
        $result['employee_document'] = $employee_document;
        $result['userData'] = $user;
        $result['userRoles'] = $roles;
        $result['restriction'] = $restrictionTracker;

        return response()->json($result, 200);
    }

    public function arrFormet($data, $target)
    {
        $list = array();
        $dataArr = array();
        foreach ($data as $v) {
            $list[] = $v[$target];
            $dataArr[$v[$target]] = $v;
        }
        return array(
            'list' => $list,
            'data' => $dataArr,
        );
    }

    public function roleData(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        //$packageData = Modules::getPackageData();
        $packageData = Packagemodule::where('packageid', Auth::user()->packageid)->get();

        $packageModules = Arr::pluck($packageData, 'subpermissions', 'moduleid');
        $rolaData = Rolemodule::where('roleid', $input['id'])->get();

        $roles = array();
        foreach ($rolaData as $v) {
            if (isset($packageModules[$v['moduleid']])) {
                $subpermissionsArr = array();
                foreach ($packageModules[$v['moduleid']] as $p) {
                    if ($p['status'] == true) {
                        $subpermissionsArr[] = $p;
                    }
                }
                $v['subpermissions'] = $subpermissionsArr;
                $v['status'] = true;
                $roles[] = $v;
            }
        }

        return response()->json($roles, 200);
    }

    public function loginInfoUpdate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);
        $validator = Validator::make($input, [
            'name' => 'sometimes|required',
            'email' => 'sometimes|required|email|unique:App\Models\User,email,' . $input['id'] . '|max:64',
            'password' => 'sometimes|required|max:255',
            'role_id' => 'sometimes|required|max:32',
            'company' => 'sometimes|required|max:64',
            'permissions' => 'sometimes|required',
            'id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
            ], 422);
        }


        $authData = Auth::user();
        $targetUser = User::find($input['id']);
        $targetCompany = Company::find($authData->companyid);
        if (!$targetCompany) {
            return response()->json([
                'message' => 'Not Found',
            ], 404);
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

        if (isset($input['role'])) {
            $roleData = Role::where('name', $input['role'])->first();
            if ($roleData) {
                $input['roleid'] = $roleData->id;
            } else {
                return response()->json([
                    'message' => 'Role is not found',
                ], 403);
            }
        }

        if ($targetUser->roleid == CONST_ROLE_DEVELOPER ||
            $targetUser->roleid == CONST_ROLE_SUPER_ADMIN) {
            unset($input['role_id']);
            unset($input['roleid']);
            $permissionDataUpdate = false;
        }

        \DB::beginTransaction();

        try {
            $data = array();
            if (isset($input['name'])) {
                $data['name'] = $input['name'];
            }
            if (isset($input['email'])) {
                $data['email'] = $input['email'];
                $data['username'] = $input['email'];
            }
            if (isset($input['role'])) {
                $data['role'] = $input['role'];
            }
            if (isset($input['phone'])) {
                $data['phone'] = $input['phone'];
            }
            if (isset($input['password'])) {
                $data['password'] = Hash::make($input['password']);
            }

            //Only Profile picture name create
            if ($request->hasFile('logoData')) {
                $encrypted_propic = Str::random(32); //Random String
                $target_file = $request->file('logoData');
                $fileExt = $target_file->getClientOriginalExtension(); //Get Extention
                $propic_name = $encrypted_propic . '.' . $fileExt; // Concat random string and extension
                $data['propic'] = $propic_name;
                $oldpic = $targetUser->propic;
            }

            $update = User::where('id',$input['id'])->update($data);

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
                if ($permissionDataUpdate) {
                    $delete = Userrestriction::where('userid', $input['id'])->delete();
                    foreach ($input['permissions'] as $v) {
                        if ($v['status'] == false) {
                            $newRestriction = new Userrestriction;
                            $newRestriction->moduleid = $v['moduleid'];
                            $newRestriction->userid = $input['id'];
                            $newRestriction->type = 'module';
                            $newRestriction->save();
                        } else {
                            foreach ($v['subpermissions'] as $s) {
                                if ($s['status'] == false) {
                                    $newRestriction = new Userrestriction;
                                    $newRestriction->moduleid = $v['moduleid'];
                                    $newRestriction->userid = $input['id'];
                                    $newRestriction->subpermission = $s['name'];
                                    $newRestriction->type = 'subpermission';
                                    $newRestriction->save();
                                }
                            }
                        }
                    }
                }
            }

        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();


        return response()->json([
            $update,
            'message' => "Login information updated successfully.",
        ], 200);
    }

    public function generalInfoUpdate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors'  => $validator->errors(),
            ], 422);
        }

        $authData = Auth::user();

        $targetGeneralInfo = Employee::where('userid', $input['id'])->first();
        if (!$targetGeneralInfo) {
            return response()->json([
                'message' => 'Not Found',
            ], 404);
        }
        \DB::beginTransaction();

        try {
            $userGeneralInfo = array();
            if (isset($input['personalEmail'])) {
                $userGeneralInfo['personalemail'] = $input['personalEmail'];
            }
            if (isset($input['officeEmail'])) {
                $userGeneralInfo['officeemail'] = $input['officeEmail'];
            }
            if (isset($input['personalPhone'])) {
                $userGeneralInfo['personalmobile'] = $input['personalPhone'];
            }
            if (isset($input['officePhone'])) {
                $userGeneralInfo['officemobile'] = $input['officePhone'];
            }
            if (isset($input['verificationidtype'])) {
                $userGeneralInfo['verificationidtype'] = $input['verificationidtype'];
            }
            if (isset($input['verificationIdNumber'])) {
                $userGeneralInfo['verificationidnumber'] = $input['verificationIdNumber'];
            }
            if (isset($input['verificationIdFileName'])) {
                $userGeneralInfo['verificationidfile'] = $input['verificationIdFileName'];
            }
            if (isset($input['nationality'])) {
                $userGeneralInfo['nationality'] = $input['nationality'];
            }
            if (isset($input['bloodgroup'])) {
                $userGeneralInfo['bloodgroup'] = $input['bloodgroup'];
            }
            if (isset($input['dateOfBirth'])) {
                $userGeneralInfo['dateofbirth'] = $input['dateOfBirth'];
            }
            if (isset($input['gender'])) {
                $userGeneralInfo['gender'] = $input['gender'];
            }
            if (isset($input['religion'])) {
                $userGeneralInfo['religion'] = $input['religion'];
            }
            if (isset($input['meritalStatus'])) {
                $userGeneralInfo['meritalstatus'] = $input['meritalStatus'];
            }
            if (isset($input['presentAddressLine1'])) {
                $userGeneralInfo['presentaddressline1'] = $input['presentAddressLine1'];
            }
            if (isset($input['presentAddressLine2'])) {
                $userGeneralInfo['presentaddressline2'] = $input['presentAddressLine2'];
            }
            if (isset($input['presentAddressPostCode'])) {
                $userGeneralInfo['presentaddresspostcode'] = $input['presentAddressPostCode'];
            }
            if (isset($input['presentAddressCity'])) {
                $userGeneralInfo['presentaddresscity'] = $input['presentAddressCity'];
            }
            if (isset($input['permanentAddressLine1'])) {
                $userGeneralInfo['permanentaddressline1'] = $input['permanentAddressLine1'];
            }
            if (isset($input['permanentAddressLine2'])) {
                $userGeneralInfo['permanentaddressline2'] = $input['permanentAddressLine2'];
            }
            if (isset($input['permanentaddressPostCode'])) {
                $userGeneralInfo['permanentaddresspostcode'] = $input['permanentaddressPostCode'];
            }
            if (isset($input['permanentAddressCity'])) {
                $userGeneralInfo['permanentaddresscity'] = $input['permanentAddressCity'];
            }
            if ($request->hasFile('verificationIdFile')) {
                $encrypted_verificationFile_name = Str::random(32);
                $target_verificationFile = $request->file('verificationIdFile');
                $fileExt = $target_verificationFile->getClientOriginalExtension();
                $verificationIdFile_name = $encrypted_verificationFile_name . '.' . $fileExt;
                $userGeneralInfo['verificationidfile'] = $verificationIdFile_name;
                $oldAttachment = $targetGeneralInfo->verificationidfile;

            }
            $update = Employee::where('userid', $input['id'])->update($userGeneralInfo);

            if ($update && $request->hasFile('verificationIdFile')) {

                //Storing Path
                $filePath = 'public/company-' . $authData->companyid . '/user-' . $input['id'] . '/document';
                //Delete old picture
                Storage::delete($filePath . '/' . $oldAttachment);
                //Storing function
                // target_file->storeAs(path,file name);
                $target_verificationFile->storeAs($filePath, $verificationIdFile_name);

            }
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();
        return response()->json([
            $update,
            'message' => "General information updated successfully"
        ], 200);
    }

    public function featureUpdate(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors'  => $validator->errors(),
            ], 422);
        }

        \DB::beginTransaction();
        try {
            $userFeature = array();
            if (isset($input['designation'])) {
                $userFeature['designation'] = $input['designation'];
            }
            if (isset($input['jobDescription'])) {
                $userFeature['jobdescription'] = $input['jobDescription'];
            }
            if (isset($input['payRoll'])) {
                $userFeature['payrollpackage'] = $input['payRoll'];
            }
            if (isset($input['leavePackage'])) {
                $userFeature['leavepackage'] = $input['leavePackage'];
            }
            if (isset($input['assetPackage'])) {
                $userFeature['assetpackage'] = $input['assetPackage'];
            }
            if (isset($input['employeeType'])) {
                $userFeature['employeetype'] = $input['employeeType'];
            }

            $update = Employee::where('userid', $input['id'])->update($userFeature);
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();
        return response()->json([
            $update,
            'message' => "Feature updated successfully"
        ], 200);
    }

    public function organizationTreeUpdate(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors'  => $validator->errors(),
            ], 422);
        }

        \DB::beginTransaction();

        try {
            $organizationTree = array();
            if (isset($input['selectedTree'])) {
                $organizationTree['organizationtree'] = $input['selectedTree'];
            }
            $update = Employee::where('userid', $input['id'])->update($organizationTree);

        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();
        return response()->json([
            $update,
            'message' => "Organization tree updated successfully"
        ], 200);
    }

    public function educationHistoryUpdate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors'  => $validator->errors(),
            ], 422);
        }

        $authData = Auth::user();
        $eduData = Educationhistory::find($input['id']);

        if (!$eduData) {
            return response()->json([
                'message' => 'Not Found',
            ], 404);
        }


        \DB::beginTransaction();

        try {
            $educationHistory = array();

            if (isset($input['degreeName'])) {
                $educationHistory['degreename'] = $input['degreeName'];
            }
            if (isset($input['instituteName'])) {
                $educationHistory['institutename'] = $input['instituteName'];
            }
            if (isset($input['passingYear'])) {
                $educationHistory['passingyear'] = $input['passingYear'];
            }
            if (isset($input['resultType'])) {
                $educationHistory['resulttype'] = $input['resultType'];
            }
            if (isset($input['cgpa'])) {
                $educationHistory['cgpa'] = $input['cgpa'];
            }
            if (isset($input['outof'])) {
                $educationHistory['outof'] = $input['outof'];
            }
            if (isset($input['division'])) {
                $educationHistory['division'] = $input['division'];
            }
            //Only education attachment name create
            if ($request->hasFile('certificateAttachment')) {
                $encrypted_certificateAttachment = Str::random(32);
                $target_certificateAttachment = $request->file('certificateAttachment');
                $fileExt = $target_certificateAttachment->getClientOriginalExtension();
                $certificateAttachment_name = $encrypted_certificateAttachment . '.' . $fileExt;
                $educationHistory['certificateattachment'] = $certificateAttachment_name;
                $oldAttachment = $eduData->certificateattachment;
            }

            $update = Educationhistory::find($input['id'])->update($educationHistory);
            if ($update && $request->hasFile('certificateAttachment')) {
                //Store Path
                $filePath = 'public/company-' . $authData->companyid . '/user-' . $eduData->userid . '/document';
                //Delete old picture
                Storage::delete($filePath . '/' . $oldAttachment);
                //Storing function
                // target_file->storeAs(path,file name);
                $target_certificateAttachment->storeAs($filePath, $certificateAttachment_name);
            }


        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();

        return response()->json([
            $update,
            'message' => "Education history updated successfully"
        ], 200);

    }

    public function jobHistoryUpdate(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors'  => $validator->errors(),
            ], 422);
        }

        $authData = Auth::user();

        \DB::beginTransaction();

        try {
            $jobHistory = array();
            if (isset($input['orgName'])) {
                $jobHistory['orgname'] = $input['orgName'];
            }
            if (isset($input['designation'])) {
                $jobHistory['designation'] = $input['designation'];
            }
            if (isset($input['jobDuration']['start'])) {
                $jobHistory['jobstartdate'] = $input['jobDuration']['start'];
            }
            if (isset($input['jobDuration']['end'])) {
                $jobHistory['jobclosedate'] = $input['jobDuration']['end'];
            }
            if (isset($input['responsibility'])) {
                $jobHistory['responsibility'] = $input['responsibility'];
            }
            if (isset($input['skill'])) {
                $jobHistory['skill'] = $input['skill'];
            }


            $update = Jobhistory::find($input['id'])->update($jobHistory);

        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();
        return response()->json([
            $update,
            'message' => "Job history updated successfully"
        ], 200);
    }

    public function nomineeUpdate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors'  => $validator->errors(),
            ], 422);
        }

        $authData = Auth::user();
        $nomineeData = Nominee::find($input['id']);
        if (!$nomineeData) {
            return response()->json([
                'message' => 'Not Found',
            ], 404);
        }

        \DB::beginTransaction();

        try {
            $nominee = array();
            if (isset($input['familymembername'])) {
                $nominee['familymembername'] = $input['familymembername'];
            }
            if (isset($input['relationshiptype'])) {
                $nominee['relationshiptype'] = $input['relationshiptype'];
            }
            if (isset($input['nominee'])) {
                $nominee['nominee'] = $input['nominee'];
            }
            //Only nominee attachment name create
            if ($request->hasFile('nomineeIdAttachment')) {
                $encrypted_nomineeIdAttachment = Str::random(32);
                $target_nomineeIdAttachment = $request->file('nomineeIdAttachment');
                $fileExt = $target_nomineeIdAttachment->getClientOriginalExtension();
                $nomineeIdAttachment_name = $encrypted_nomineeIdAttachment . '.' . $fileExt;
                $nominee['verificationidfile'] = $nomineeIdAttachment_name;
                $oldAttachment = $nomineeData->verificationidfile;
            }
            $update = Nominee::where('id',$input['id'])->update($nominee);

            if ($update && $request->hasFile('nomineeIdAttachment')) {

                $filePath = 'public/company-' . $authData->companyid . '/user-' . $nomineeData->userid . '/document';
                //Delete old picture
                Storage::delete($filePath . '/' . $oldAttachment);
                $target_nomineeIdAttachment->storeAs($filePath, $nomineeIdAttachment_name);

            }
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();
        return response()->json([
            $update,
            'message' => "Nominee updated successfully"
        ], 200);
    }

    public function skillUpdate(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors'  => $validator->errors(),
            ], 422);
        }

        \DB::beginTransaction();

        try {
            $skillMatrix = array();
            if (isset($input['skillsscale'])) {
                $skillMatrix['skillsscale'] = $input['skillsscale'];
            }
            if (isset($input['skillsname'])) {
                $skillMatrix['skillsname'] = $input['skillsname'];
            }

            $update = Skillmatrice::find($input['id'])->update($skillMatrix);
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);

        }
        \DB::commit();

        return response()->json([
            $update,
            'message' => "Skill updated successfully"
        ], 200);
    }

    public function educationHistoryCreate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);

        $validator = Validator::make($input, [
            'degreeName' => 'required|max:32',
            'instituteName' => 'required|max:32',
            'passingYear' => 'required|max:32',
            'resultType' => 'required|max:32',
            'userId' => 'required|max:32',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'errors'  => $validator->errors(),
            ], 422);
        }
        $authData = Auth::user();

        \DB::beginTransaction();

        try {
            $educationHistory = new Educationhistory;

            $educationHistory->degreename = $input['degreeName'];
            $educationHistory->institutename = $input['instituteName'];
            $educationHistory->passingyear = $input['passingYear'];
            $educationHistory->resulttype = $input['resultType'];
            if (isset($input['cgpa'])) {
                $educationHistory->cgpa = $input['cgpa'];
            }
            if (isset($input['outof'])) {
                $educationHistory->outof = $input['outof'];
            }
            if (isset($input['division'])) {
                $educationHistory->division = $input['division'];
            }
            $educationHistory->companyid = $authData->companyid;
            $educationHistory->userid = $input['userId'];
            if ($request->hasFile('certificateAttachment')) {
                $encrypted_eduAttachment = Str::random(32);
                $target_eduAttachment = $request->file('certificateAttachment');
                $fileExt = $target_eduAttachment->getClientOriginalExtension();
                $eduAttachment_name = $encrypted_eduAttachment . '.' . $fileExt;
                $educationHistory['certificateattachment'] = $eduAttachment_name;
            }
            $register = $educationHistory->save();

            if ($register && $request->hasFile('certificateAttachment')) {
                $filePath = 'public/company-' . $authData->companyid . '/user-' . $input['userId'] . '/document';
                $target_eduAttachment->storeAs($filePath, $eduAttachment_name);

            }
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        \DB::commit();

        return response()->json([
            $register,
            'message' => "Education history created successfully"
        ], 200);
    }

    public function jobHistoryCreate(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'orgName' => 'required|max:32',
            'designation' => 'required|max:32',
            'jobDuration' => 'required|max:32',
            'responsibility' => 'required|max:32',
            'skill' => 'required|max:32',
            'userId' => 'required|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }

        $authData = Auth::user();
        try {
            $jobHistory = new Jobhistory;
            $jobHistory->orgname = $input['orgName'];
            $jobHistory->designation = $input['designation'];
            $jobHistory->jobstartdate = $input['jobDuration']['start'];
            $jobHistory->jobclosedate = $input['jobDuration']['end'];
            $jobHistory->responsibility = $input['responsibility'];
            $jobHistory->skill = $input['skill'];

            $jobHistory->companyid = $authData->companyid;
            $jobHistory->userid = $input['userId'];

            $register = $jobHistory->save();
            return response()->json([
                $register,
                'message' => "Job history created successfully."
                ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }


    }

    public function nomineeCreate(Request $request)
    {

        $input = $request->all();
        $input = json_decode($input['data'], true);

        $validator = Validator::make($input, [
            //nominee
            'familymembername' => 'required|max:32',
            'relationshiptype' => 'required|max:32',
            'nominee' => 'required|max:32',
            'userId' => 'required|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }

        $authData = Auth::user();

        \DB::beginTransaction();

        try {
            if ($request->hasFile('nomineeIdAttachment')) {
                $encrypted_nominee_Attachment = Str::random(32);
                $target_nominee_Attachment = $request->file('nomineeIdAttachment');
                $fileExt = $target_nominee_Attachment->getClientOriginalExtension();
                $nominee_Attachment_name = $encrypted_nominee_Attachment . '.' . $fileExt;
            }else{
                $nominee_Attachment_name = null;
            }

                $results = Nominee::create([
                    'companyid' => $authData->companyid,
                    'userid' => $input['userId'],
                    'nominee' => $input['nominee'],
                    'familymembername' => $input['familymembername'],
                    'relationshiptype' => $input['relationshiptype'],
                    'verificationidfile' => $nominee_Attachment_name,
                ]);

                if ($results && $request->hasFile('nomineeIdAttachment')) {
                    $filePath = 'public/company-' . $authData->companyid . '/user-' . $input['userId'] . '/nominee_';
                    //Storing function
                    // target_file->storeAs(path,file name);
                    $target_nominee_Attachment->storeAs($filePath, $nominee_Attachment_name);
                }

            }
            catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
        \DB::commit();

        return response()->json([
            $results,
            'message' => "Nominee created successfully"
        ], 200);

    }

    public function skillCreate(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'skillsname' => 'required|max:32',
            'skillsscale' => 'required|max:32',
            'userId' => 'required|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }

        $authData = Auth::user();

        try {
            $skillMatrix = new Skillmatrice;

            $skillMatrix->skillsscale = $input['skillsscale'];
            $skillMatrix->skillsname = $input['skillsname'];

            $skillMatrix->companyid = $authData->companyid;
            $skillMatrix->userid = $input['userId'];

            $register = $skillMatrix->save();

            return response()->json([
                $register,
                'message' => "Skill added successfully"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function DocumentCreate(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);
        $validator = Validator::make($input, [
            'document_title' => 'required|max:32',
            'userId' => 'required|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }

        $authData = Auth::user();

        \DB::beginTransaction();

        try {
            if ($request->hasFile('documentAttachment')) {
                $encrypted_documentAttachment = Str::random(32);
                $target_documentAttachment = $request->file('documentAttachment');
                $fileExt = $target_documentAttachment->getClientOriginalExtension();
                $documentAttachment_name = $encrypted_documentAttachment . '.' . $fileExt;

                $results = EmployeeDocument::create([
                    'company_id' => $authData->companyid,
                    'user_id' => $input['userId'],
                    'document_title' => $input['document_title'],
                    'document_attachment' => $documentAttachment_name,
                ]);

                if ($results) {
                    $filePath = 'public/company-' . $authData->companyid . '/user-' . $input['userId'] . '/document';
                    //Storing function
                    // target_file->storeAs(path,file name);
                    $target_documentAttachment->storeAs($filePath, $documentAttachment_name);
                }

            }else{
                return response()->json([
                    'message' => 'Attachment Required'
                ], 422);
            }

        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
        \DB::commit();
        return response()->json([
            'status' => true,
            'message' => "New document created successfully"
        ], 200);
    }

    public function skillDelete(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }
        $delete = Skillmatrice::destroy($request->id);
        return response()->json([
            $delete,
            'message' => "Skill deleted successfully"
        ], 200);
    }

    public function nomineeDelete(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }
        $delete = Nominee::destroy($request->id);
        return response()->json([
            $delete,
            'message' => "Nominee deleted successfully"
        ], 200);
    }

    public function jobHistoryDelete(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }
        $delete = Jobhistory::destroy($request->id);
        return response()->json([
            $delete,
            'message' => "Job history deleted successfully."
            ], 200);
    }

    public function DocumentDelete(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }
        $delete = EmployeeDocument::destroy($request->id);
        return response()->json([
            $delete,
            'message' => 'Employee document deleted successfully'
        ], 200);
    }

    public function educationHistoryDelete(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }
        $delete = Educationhistory::destroy($request->id);
        return response()->json([
            $delete,
            'message' => "Education history deleted successfully."
        ], 200);
    }

    public function DocumentUpdate(Request $request)
    {
        $input = $request->all();

        $input = json_decode($input['data'], true);
        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
            ], 400);
        }
        $authUser = Auth::user();
        $target_doc = EmployeeDocument::find($input['id']);
        if ($target_doc == null) {
            return response()->json([
                'message' => "Not Found !!!",
            ], 404);
        }

        \DB::beginTransaction();
        try {
            //Document Attachment
            if ($request->hasFile('documentAttachment')) {
                $encrypted_documentAttachment = Str::random(32);
                $target_documentAttachment = $request->file('documentAttachment');
                $fileExt = $target_documentAttachment->getClientOriginalExtension();
                $documentAttachment_name = $encrypted_documentAttachment . '.' . $fileExt;

            } else {
                $documentAttachment_name = $target_doc->document_attachment;
            }
            $results = EmployeeDocument::find($input['id'])->update([
                'document_title' => $input['document_title'],
                'document_attachment' => $documentAttachment_name,
            ]);
            if ($results && $request->hasFile('documentAttachment')) {
                $filePath = 'public/company-' . $authUser->companyid . '/user-' . $target_doc->user_id . '/document';
                //Storing function
                // target_file->storeAs(path,file name);
                $target_documentAttachment->storeAs($filePath, $documentAttachment_name);
                Storage::delete($filePath . '/' . $input['savedFileName']);
            }

        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
        \DB::commit();
        return response()->json([
            $results,
            'message' => "Employee document updated successfully."
        ], 200);
    }


    public function tie($arr)
    {
        $result = array();
        foreach ($arr as $v) {
            $seArr = explode('-', $v['serial']);
            $serArrCount = count(explode('-', $v['serial']));
            $tmpArray = &$result;

            while (count($seArr) > 0) {
                $k = array_shift($seArr);

                if (!is_array($tmpArray)) {
                    $tmpArray = array();
                }
                if ($serArrCount == 1 || count($seArr) == 0) {
                    $tmpArray = &$tmpArray[$k];
                    if (isset($tmpArray['children'])) {
                        $children = $tmpArray['children'];
                        $tmpArray = array(
                            'name' => $v['name'],
                            'rccode' => $v['rccode'],
                            'type' => $v['type'],
                            'organizationid' => $v['organizationid'],
                            'organizationhead' => $v['organizationhead'],
                            'serial' => $v['serial'],
                            'children' => $children,
                        );
                    } else {
                        $tmpArray = $v;
                    }
                } else {
                    $tmpArray = &$tmpArray[$k]['children'];
                }
            }

        }
        return $result;
    }

    public function reload($arr, $selectedTree)
    {

        ksort($arr);
        $authUser = Auth::user();
        $users = User::where('companyid', $authUser->companyid)->get();
        $result = array();
        foreach ($arr as $v) {
            if ($user = $users->where('id',$v['organizationhead'])->first()){
                $h_name = " (".$user->name.")";
            }else{
                $h_name = null;
            }
            if (isset($v['children'])) {
                if (count($v['children']) > 0) {
                    ksort($v['children']);
                    $v['children'] = $this->reload($v['children'], $selectedTree);
                } else {
                    $v['children'] = array();
                }
            } else {
                $v['children'] = array();
            }
            if (isset($v['name'])) {
                $subArr = array(
                    'text' => $v['name'].$h_name,
                    'type' => $v['type'],
                    'rccode' => $v['rccode'],
                    'organizationid' => $v['organizationid'],
                    'organizationhead' => $v['organizationhead'],
                    "opened" => true,
                    "icon" => "fa fa-building icon-state-default",
                    'children' => $v['children'],
                );
                if ($v['organizationid'] == $selectedTree) {
                    $subArr['selected'] = true;
                }
                $result[] = $subArr;
            } else {

                if (count($v['children']) > 0) {
                    ksort($v['children']);
                    foreach ($v['children'] as $deletedchildrenData) {
                        $subArr = array(
                            'text' => $deletedchildrenData['name'].$h_name,
                            'type' => $deletedchildrenData['type'],
                            'rccode' => $deletedchildrenData['rccode'],
                            'organizationid' => $deletedchildrenData['organizationid'],
                            'organizationhead' => $deletedchildrenData['organizationhead'],
                            "opened" => true,
                            "icon" => "fa fa-building icon-state-default",
                            'children' => $deletedchildrenData['children'],
                        );
                        if ($deletedchildrenData['organizationid'] == $selectedTree) {
                            $subArr['selected'] = true;
                        }

                        $result[] = $subArr;
                    }
                }
            }
        }
        return $result;
    }


}
