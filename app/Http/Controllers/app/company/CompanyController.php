<?php

namespace App\Http\Controllers\app\company;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Packagemodule;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class CompanyController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }


    public function data(Request $request){
        $is_active = $request->is_active;

        //$company = Company::where('is_active', )->orderBy('name')->get();
        $query = DB::table('companies as c')
            ->join('packages as p', 'c.packageid', '=', 'p.id')
            ->select('c.id', 'c.name', 'c.email', 'c.phone', 'c.logo', 'c.website', 'c.is_active',
                'p.name as package_name');

        //Filter using is_active
        if ($is_active != -1) {
            $query->where('c.is_active', '=', $is_active);
        }
        $companies = $query->get();
        $company_data = [];
        foreach ($companies as $company) {
            if ($company->logo != null || $company->logo != '') {
                $company->company_logo = '/storage/company-' . $company->id . '/' . $company->logo;
            }else{
                $company->company_logo = '/storage/default/company-logo.png';
            }
            array_push($company_data, [
                'id' => $company->id,
                'name' => $company->name,
                'email' => $company->email,
                'phone' => $company->phone,
                'company_logo' => $company->company_logo,
                'website' => $company->website,
                'is_active' => $company->is_active,
                'package_name' => $company->package_name,
            ]);
        }

        return response()->json($company_data, 200);
    }

    public function delete(Request $request){
        $input = $request->all();
        //$delete = Company::destroy($input['id']);
        return response()->json(['message'=>'Company delete successfully'], 200);
    }

    /**
     * Show company information
     * Added By: Hasan Masud
     * Added On: 2020-02-15
     *
     * @param  \App\Models\Company  $company_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function companyInfo($company_id)
    {
        $response = array();

        $company_info = Company::find($company_id);
        //$company_info->is_active = ($company_info->is_active == 1) ? 'Active' : 'Inactive';
        if ($company_info->logo != null || $company_info->logo != '') {
            $company_info->company_logo = '/storage/company-' . $company_info->id . '/' . $company_info->logo;
        } else {
            $company_info->company_logo = '/storage/default/company-logo.png';
        }

        $admin_info = User::select(DB::raw("TRIM(CONCAT(users.first_name,' ',IFNULL(users.last_name, ''))) as full_name"),
                                'email', 'phone')
                            ->where('id', $company_info->adminid)->first();

        $package_info = Package::where('id', $company_info->packageid)->first();

        $package_permission = Packagemodule::where('packageid', $company_info->packageid)->get();

        $permission_head = ['Module'];
        foreach ($package_permission as $pp) {
            foreach ($pp['subpermissions'] as $sub_permission) {
                array_push($permission_head, $sub_permission['title']);
            }
        }


        if ($company_info){
            $response['status'] = 200;
            $response['company_info'] = $company_info;
            $response['admin_info'] = $admin_info;
            $response['package_info'] = $package_info;
            $response['package_permission'] = $package_permission;
            $response['permission_head'] = array_unique($permission_head);
            $response['message'] = 'Successfully fetched row';
            $response['errors'] = [];
            return response()->json($response, 200);
        }

        return response()->json($response, 204);
    }

    /**
     * Update Company 'is_active' status
     * If we get is_active = 1 then deactivate the Company
     * If we get is_active = 0 then active the Company
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Company $company
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeCompanyActive(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required|integer',
            'is_active' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $auth_user = Auth::user();

        if ($request->is_active == 1){
            $new_status = 0;
            $status_txt = "Locked";
        }else{
            $new_status = 1;
            $status_txt = "Unlocked";
        }

        if (($auth_user->roleid == CONST_ROLE_DEVELOPER ||
                $auth_user->roleid == CONST_ROLE_SUPER_ADMIN))
        {
            $user = Company::findOrFail($request->id);
            $user->is_active = $new_status;
            $user->save();

            return response()->json([
                'message' => "Company has been $status_txt successfully.",
                'data' => ['is_active' => $new_status]
            ],200);
        }
        return response()->json(['message' => "You may not have the right permission"], 404);
    }
}
