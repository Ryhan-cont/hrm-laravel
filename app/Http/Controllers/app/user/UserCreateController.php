<?php

namespace App\Http\Controllers\app\user;

use App\Notifications\UserCreateNotification;

use App\Http\Controllers\Controller;
use App\Models\EmployeeDocument;
use App\Models\Module;
use App\Models\Packagemodule;
use Illuminate\Hashing\BcryptHasher;
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
use Monolog\Handler\IFTTTHandler;
use function GuzzleHttp\Promise\all;

class UserCreateController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data()
    {


        $roleData = Role::select("id as value", "name as label")
            ->where('id', '!=', CONST_ROLE_SUPER_ADMIN)
            ->where('id', '!=', CONST_ROLE_DEVELOPER)
            ->where('id', '!=', CONST_ROLE_COMPANY_ADMIN)
            ->orderBy('id', 'desc')
            ->get();

        $authUser = Auth::user();


        $organizationData = Organization::where('companyid', $authUser->companyid)->get();


        $organizationtreeData = Organizationtree::where('companyid', $authUser->companyid)->get();
        $organizationTreeArr = Tools::assignKey($organizationtreeData, 'organizationid');
        $savedPrimatyOrganizationCount = count($organizationtreeData);
        foreach ($organizationData as $v) {
            if (isset($organizationTreeArr[$v['id']])) {
                $targetData = $organizationTreeArr[$v['id']];
                $subArr = array(
                    'name' => $v['name'],
                    'rccode' => $v['rccode'],
                    'type' => $v['type'],
                    'organizationid' => $v['organizationid'],
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
        $organizationTree = $this->reload($organizationTree);

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


        $allDropdownData = DropdownItem::select('id', 'name as label', 'dropdown_id')
            ->whereIn('companyid', [0, $authUser->companyid])
            ->get();
        $designationData = [];
        $employeeTypeData = [];
        foreach ($allDropdownData as $drop) {
            if ($drop->dropdown_id == CONST_DD_DESIGNATIONS) {
                array_push($designationData, $drop);
            }
            if ($drop->dropdown_id == CONST_DD_EMPLOYEE_TYPES) {
                array_push($employeeTypeData, $drop);
            }
        }


        return response()->json([
            'roleData' => $roleData,
            'leaveData' => $leaveData,
            'assetData' => $assetPackage,
            'payrollData' => $payrollData,
            'jobDescriptionData' => $jobDescriptionData,
            'designationData' => $designationData,
            'employeeTypeData' => $employeeTypeData,
            'organizationTree' => $organizationTree,
        ], 200);
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

        $packageData = Packagemodule::where('packageid', Auth::user()->packageid)->get();

        $packageModules = Arr::pluck($packageData, 'name', 'moduleid');

        $roleData = Rolemodule::where('roleid', $input['id'])->get();

        $roles = array();
        foreach ($roleData as $v) {
            if (isset($packageModules[$v['moduleid']])) {
                $v['status'] = true;
                $roles[] = $v;
            }
        }

        return response()->json($roles, 200);
    }

    public function create(Request $request)
    {

        $input = $request->all();
        $input = json_decode($input['data'], true);

        $validator = Validator::make($input, [
            'first_name' => 'required',
            'last_name' => 'required',
            'emp_id' => 'required',
            'email' => 'required|unique:App\Models\User|email',
            'role' => 'required',
            //'permissions' => 'required',

            //feature
            'designation' => 'required',
            'payRoll' => 'required',
            'leavePackage' => 'required',
            'assetPackage' => 'required',
            'jobDescription' => 'required',
            'employeeType' => 'required',

            //tree
            'selectedTree' => 'required',


        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }


        $authUser = Auth::user();
        $info = DB::table('companies')
            ->join('packages', 'companies.packageid', 'packages.id')
            ->where('companies.id', $authUser->companyid)
            ->select('packages.nou as user_limit')
            ->first();
        $user_count = User::where('companyid', $authUser->companyid)->count();
        //function for user limit check
        if ($user_count >= $info->user_limit) {
            return response()->json([
                'message' => 'You have reached User creation limit: ' . $info->user_limit
            ], 406);

        }
        if ($input['employeeType']['id'] < CONST_ROLE_USER) {
            return response()->json([
                'message' => 'This type of user creation cannot be processed'
            ], 406);
        }

        //User Password will be send to user email
        $user_password = Str::random(8);

        try {
            DB::beginTransaction();

            //User Information create
            $newUser = new User;

            $newUser->first_name = $input['first_name'];
            $newUser->last_name = $input['last_name'];
            $newUser->email = $input['email'];
            $newUser->username = $input['email'];
            $newUser->phone = $input['phone'];
            $newUser->password = bcrypt($user_password);
            //Only Profile picture name create
            if ($request->hasFile('logoData')) {
                $encrypted_propic = Str::random(); //Random String
                $target_file = $request->file('logoData');
                $fileExt = $target_file->getClientOriginalExtension(); //Get Extension
                $propic_name = $encrypted_propic . '.' . $fileExt; // Concat random string and extension
                $newUser->propic = $propic_name;
            }

            $newUser->companyid = $authUser->companyid;
            $newUser->createdby = $authUser->id;
            $newUser->packageid = $authUser->packageid;

            $newUser->roleid = $input['role'];


            $registerNewUser = $newUser->save();
            



            if ($registerNewUser) {
                $newUser->raw_pass = $user_password;
                $newUser->notify(new UserCreateNotification($newUser));

                if ($request->hasFile('logoData')) {
                    $filePath = 'public/company-' . $authUser->companyid . '/user-' . $newUser->id;
                    $target_file->storeAs($filePath, $newUser->propic);
                }

                //General info Create
                $userGeneralInfo = new Employee;
                $userGeneralInfo->emp_id = $input['emp_id'];
                $userGeneralInfo->designation = $input['designation']['id'];
                $userGeneralInfo->organizationtree = $input['selectedTree']['organizationid'];
                $userGeneralInfo->jobdescription = $input['jobDescription']['value'];
                $userGeneralInfo->payrollpackage = $input['payRoll']['value'];
                $userGeneralInfo->leavepackage = $input['leavePackage']['value'];
                $userGeneralInfo->assetpackage = $input['assetPackage']['value'];
                $userGeneralInfo->employeetype = $input['employeeType']['id'];
                $userGeneralInfo->supervisor = $input['selectedTree']['organizationheadid'];
                if ($input['contract_date']['start'] != "" && $input['contract_date']['start'] != ""){
                    $userGeneralInfo->contract_start_date = date('Y-m-d', strtotime($input['contract_date']['start']));
                    $userGeneralInfo->contract_end_date = date('Y-m-d', strtotime($input['contract_date']['end']));
                }



                $userGeneralInfo->companyid = $authUser->companyid;
                $userGeneralInfo->userid = $newUser->id;


                $registerUserGeneralInfo = $userGeneralInfo->save();

                /*
                foreach ($input['permissions'] as $v) {
                    if ($v['status'] == false) {
                        $newRestriction = new Userrestriction;
                        $newRestriction->moduleid = $v['id'];
                        $newRestriction->userid = $newUser->id;
                        $newRestriction->type = 'module';
                        $newRestriction->save();
                    } else {
                        foreach ($v['subpermissions'] as $s) {
                            if ($s['status'] == false) {
                                $newRestriction = new Userrestriction;
                                $newRestriction->moduleid = $v['id'];
                                $newRestriction->userid = $newUser->id;
                                $newRestriction->subpermission = $s['name'];
                                $newRestriction->type = 'subpermission';
                                $newRestriction->save();
                            }
                        }
                    }
                }*/
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
        
        return response()->json([
            $registerNewUser,
            'message' => "User created successfully."
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

    public function reload($arr)
    {
        $authUser = Auth::user();
        $users = User::where('companyid', $authUser->companyid)->get();
        ksort($arr);
        $result = array();
        foreach ($arr as $v) {
            if ($user = $users->where('id', $v['organizationhead'])->first()) {
                $h_name = ' - ' . $user['first_name'] . ' ' . $user['last_name'];
            } else {
                $h_name = null;
            }
            if (isset($v['children'])) {
                if (count($v['children']) > 0) {
                    ksort($v['children']);
                    $v['children'] = $this->reload($v['children']);
                } else {
                    $v['children'] = array();
                }
            } else {
                $v['children'] = array();
            }
            if (isset($v['name'])) {
                $subArr = array(
                    'text' => $v['name'] . ' - ' . $h_name,
                    'type' => $v['type'],
                    'rccode' => $v['rccode'],
                    'organizationid' => $v['organizationid'],
                    'organizationhead' => $v['organizationhead'],
                    "opened" => true,
                    "icon" => "fa fa-building icon-state-default",
                    'children' => $v['children'],
                );
                $result[] = $subArr;
            } else {

                if (count($v['children']) > 0) {
                    ksort($v['children']);
                    foreach ($v['children'] as $deletedchildrenData) {
                        $subArr = array(
                            'text' => $deletedchildrenData['name'] . ' - ' . $h_name,
                            'type' => $deletedchildrenData['type'],
                            'rccode' => $deletedchildrenData['rccode'],
                            'organizationid' => $deletedchildrenData['organizationid'],
                            'organizationhead' => $deletedchildrenData['organizationhead'],
                            "opened" => true,
                            "icon" => "fa fa-building icon-state-default",
                            'children' => $deletedchildrenData['children'],
                        );

                        $result[] = $subArr;
                    }
                }
            }


        }
        return $result;
    }


}
