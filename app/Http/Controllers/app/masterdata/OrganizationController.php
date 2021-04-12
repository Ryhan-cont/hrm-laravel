<?php

namespace App\Http\Controllers\app\masterdata;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

use App\Models\Organization;
use App\Models\Organizationtree;
use App\Models\DropdownItem;
use App\Models\Company;
use App\Models\User;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class OrganizationController extends Controller
{
    public function data()
    {
        $authUser = Auth::user();
        $organizations = DB::table('organizations as o')
            ->join('dropdown_items as dd', 'o.type', '=', 'dd.id')
            ->join('dropdown_items as dd1', 'o.rccode', '=', 'dd1.id')
            ->leftJoin('users as u', 'o.organizationhead', '=', 'u.id')
            ->select('o.id', 'o.name', 'dd.name as type', 'dd.id as org_type_id', 'dd1.id as rc_code_id',
                'dd1.name as rccode', 'u.id as org_head_id',
                DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as org_head"))
            ->where('o.companyid', $authUser->companyid)
            ->get();
        return response()->json(['organizations' => $organizations], 200);
    }

    public function create(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'type' => 'required|integer',
            'name' => 'required|max:64',
            'rccode' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $authUser = Auth::user();
        $organization = new Organization;
        $organization->type = $input['type'];
        $organization->name = $input['name'];
        $organization->rccode = $input['rccode'];

        if (isset($input['organizationHead'])) {
            if ($input['organizationHead'] == null || $input['organizationHead'] == '') {
                $organization->organizationhead = 0;
            } else {
                $organization->organizationhead = $input['organizationHead'];
            }
        } else {
            $organization->organizationhead = 0;
        }
        $organization->companyid = $authUser->companyid;
        $register = $organization->save();
        return response()->json([
            'status' => $register,
            'message' => 'Organization created successfully'
        ], 200);
    }

    public function organizationCheck(Request $request)
    {
        $input = $request->all();
        $target_org = Organization::find($input['id']);
        $org_affected = Organization::where('organizationHead', $input['organizationHead'])->first();
        if ($org_affected && ($target_org->id != $org_affected->id)) {
            $name = $org_affected->name;
            $type = 'text-danger';
        } else {
            $name = 'No other organization';
            $type = 'text-success';
        }
        return response()->json([
            'notify' => $name . ' will be affected for this change',
            'notify_type' => $type,
        ], 200);

    }

    public function update(Request $request)
    {
        $input = $request->all();
        $target_org = Organization::find($input['id']);
        $org_affected = Organization::where('organizationHead', $input['organizationHead'])->first();
        $validator = Validator::make($input, [
            'type' => 'required|integer',
            'name' => 'required|max:64',
            'rccode' => 'required|integer',
            'id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $authUser = Auth::user();
        if ($target_org->companyid != $authUser->companyid) {
            return response()->json(['error' => 'Invalid request (unauthorized)'], 403);
        }
        if ($org_affected && ($target_org->id != $org_affected->id)) {
            Employee::where('organizationtree', $org_affected->id)->update([
                'supervisor' => null,
            ]);
            Organization::where('organizationHead', $input['organizationHead'])->update([
                'organizationHead' => null,
            ]);
        }

        Employee::where('organizationtree', $target_org->id)->update([
            'supervisor' => $input['organizationHead'],
        ]);
        Organization::where('id', $input['id'])->update([
            'organizationHead' => $input['organizationHead'],
            'name' => $input['name'],
            'type' => $input['type'],
            'rccode' => $input['rccode'],
        ]);
        return response()->json([
            'message' => 'Organization updated successfully',
        ], 200);
    }

    public function delete(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $authUser = Auth::user();
        $orgData = Organization::find($input['id']);
        if ($orgData->companyid != $authUser->companyid) {
            return response()->json(['message' => 'Invalid request (unauthorized)'], 403);
        }
        $user = Employee::where('organizationtree', $orgData->id)->count();
        if ($user) {
            return response()->json(['message' => $user . ' employees exist in this organization, so could not delete'], 403);
        }
        DB::beginTransaction();
        try {
            $delete = Organization::where('id', $input['id'])->delete();
            $deleteOrg = Organizationtree::where('organizationid', $input['id'])->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['errors' => $e->getMessage()], 500);
        }
        return response()->json([
            'status' => $delete,
            'message' => 'Organization deleted successfully'
        ], 200);
    }
}
