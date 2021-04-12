<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\DropdownItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class DropdownServiceController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }

    public function GeneralDropdown()
    {
        $authUser = Auth::user();
        $allDropdownData = DropdownItem::where('companyid', 0)->orWhere('companyid', $authUser->companyid)->get();
        if ($allDropdownData->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => "No Content",
            ], 204);
        } else {
            $dropdown = [];
            foreach ($allDropdownData as $v) {
                $dropdown[$v['name']][] = $v;
            }

            //Array making of General Information
            $gender = $this->arrFormet($dropdown['gender'], 'value');
            $bloodgroup = $this->arrFormet($dropdown['bloodgroup'], 'value');
            $religion = $this->arrFormet($dropdown['religion'], 'value');
            $nationality = $this->arrFormet($dropdown['nationality'], 'value');
            $dropdown['city'][] = array('id' => 0, 'value' => 'others');
            $city = $this->arrFormet($dropdown['city'], 'value');

            $result = [];
            //Blood Information
            $result['bloodgroupList'] = $bloodgroup['list'];
            $result['bloodgroupData'] = $bloodgroup['data'];
            //Gender Information
            $result['genderList'] = $gender['list'];
            $result['genderData'] = $gender['data'];
            //Religion Information
            $result['religionList'] = $religion['list'];
            $result['religionData'] = $religion['data'];
            //Nationality
            $result['nationalityList'] = $nationality['list'];
            $result['nationalityData'] = $nationality['data'];
            //City
            $result['cityList'] = $city['list'];
            $result['cityData'] = $city['data'];
            return response()->json([
                'data' => $result,
                'error' => [],
                'message' => "Data Fetched Successfully",
            ], 200);
        }
    }

    public function featureDropdown()
    {
        $authUser = Auth::user();
        $allDropdownData = DropdownItem::where('companyid', 0)->orWhere('companyid', $authUser->companyid)->get();
        if ($allDropdownData->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => "No Content",
            ], 204);
        } else {
            $dropdown = [];
            foreach ($allDropdownData as $v) {
                $dropdown[$v['name']][] = $v;
            }

            //Array making of General Information
            $designation = $this->arrFormet($dropdown['designation'], 'value');
            $employeeType = $this->arrFormet($dropdown['employeetype'], 'value');

            $result = [];
            //Designation Information
            $result['designationList'] = $designation['list'];
            $result['designationData'] = $designation['data'];
            //Employee Type Information
            $result['employeeTypeList'] = $employeeType['list'];
            $result['employeeTypeData'] = $employeeType['data'];
            return response()->json([
                'data' => $result,
                'error' => [],
                'message' => "Data Fetched Successfully",
            ], 200);
        }

    }

    public function educationHistoryDropdown()
    {
        $authUser = Auth::user();
        $allDropdownData = DropdownItem::where('companyid', 0)->orWhere('companyid', $authUser->companyid)->get();
        if ($allDropdownData->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => "No Content",
            ], 204);
        } else {
            $dropdown = [];
            foreach ($allDropdownData as $v) {
                $dropdown[$v['name']][] = $v;
            }

            //Array making of General Information
            $degree = $this->arrFormet($dropdown['degreename'], 'value');
            $division = $this->arrFormet($dropdown['division'], 'value');
            $dropdown['institute'][] = array('id' => 0, 'value' => 'others');
            $institute = $this->arrFormet($dropdown['institute'], 'value');

            $result = [];
            //Degree Information
            $result['degreeList'] = $degree['list'];
            $result['degreeData'] = $degree['data'];
            //Degree Division Information
            $result['divisionList'] = $division['list'];
            $result['divisionData'] = $division['data'];
            //Institute Information
            $result['instituteList'] = $institute['list'];
            $result['instituteData'] = $institute['data'];
            return response()->json([
                'data' => $result,
                'error' => [],
                'message' => "Data Fetched Successfully",
            ], 200);
        }
    }

    public function jobHistoryDropdown()
    {
        $authUser = Auth::user();
        $allDropdownData = DropdownItem::where('companyid', 0)->orWhere('companyid', $authUser->companyid)->get();
        if ($allDropdownData->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => "No Content",
            ], 204);
        } else {
            $dropdown = [];
            foreach ($allDropdownData as $v) {
                $dropdown[$v['name']][] = $v;
            }

            //Array making of General Information
            $designation = $this->arrFormet($dropdown['designation'], 'value');

            $result = [];
            //Designation Information
            $result['designationList'] = $designation['list'];
            $result['designationData'] = $designation['data'];
            return response()->json([
                'data' => $result,
                'error' => [],
                'message' => "Data Fetched Successfully",
            ], 200);
        }
    }

    public function nomineeDropdown()
    {
        $authUser = Auth::user();
        $allDropdownData = DropdownItem::where('companyid', 0)->orWhere('companyid', $authUser->companyid)->get();
        if ($allDropdownData->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => "No Content",
            ], 204);
        } else {
            $dropdown = [];
            foreach ($allDropdownData as $v) {
                $dropdown[$v['name']][] = $v;
            }

            //Array making of General Information
            $relationshipType = $this->arrFormet($dropdown['relationshiptype'], 'value');


            $result = [];
            //Designation Information
            $result['relationshipTypeList'] = $relationshipType['list'];
            $result['relationshipTypeData'] = $relationshipType['data'];
            return response()->json([
                'data' => $result,
                'error' => [],
                'message' => "Data Fetched Successfully",
            ], 200);
        }

    }

    public function skillDropdown()
    {
        $authUser = Auth::user();
        $allDropdownData = DropdownItem::where('companyid', 0)->orWhere('companyid', $authUser->companyid)->get();
        if ($allDropdownData->isEmpty()) {
            return response()->json([
                'data' => [],
                'message' => "No Content",
            ], 204);
        } else {
            $dropdown = [];
            foreach ($allDropdownData as $v) {
                $dropdown[$v['name']][] = $v;
            }

            //Array making of General Information
            $skillName = $this->arrFormet($dropdown['skillname'], 'value');
            $skillScale = $this->arrFormet($dropdown['skillscale'], 'value');


            $result = [];
            //Designation Information
            $result['skillNameList'] = $skillName['list'];
            $result['skillNameData'] = $skillName['data'];

            $result['skillScaleList'] = $skillScale['list'];
            $result['skillScaleData'] = $skillScale['data'];
            return response()->json([
                'data' => $result,
                'error' => [],
                'message' => "Data Fetched Successfully",
            ], 200);
        }
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

    /**
     * Get Dropdown items
     *
     * Added by: Hasan Masud
     * Added on: 2020-03-04
     * Usage: /api/data/dropdown-items/{id}
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     * *****************************************/
    public function dropDownItems($id)
    {
        try {
            $auth_user = Auth::user();
            $dropdown_id = stripcslashes(strip_tags($id));

            //DB::enableQueryLog(); // Enable query log
            $query = DB::table('dropdown_items as dd')
                ->select('dd.id as value', 'dd.name as label')
                ->orderBy('dd.name', 'asc');
            $query->where('dd.dropdown_id', '=', $dropdown_id);

            if ($auth_user->roleid === CONST_ROLE_DEVELOPER ||
                $auth_user->roleid === CONST_ROLE_SUPER_ADMIN) {
                $query->where('dd.companyid', '=', 0);
            } else {
                //$query->whereRaw('( dd.companyid = 0 OR dd.companyid = '.$auth_user->companyid.' )');
                $query->where(function ($query) use ($auth_user) {
                    $query->where('dd.companyid', 0)->orWhere('dd.companyid', $auth_user->companyid);
                });
            }
            $items = $query->get();
            //dd(DB::getQueryLog()); // Show results of log

            return response()->json([
                'items' => $items,
                'status' => 200,
                'message' => 'Successfully fetched rows',
                'error' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 500);
        }
    }
}
