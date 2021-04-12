<?php

namespace App\Http\Controllers\workflow;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Classes\Modules;
use App\Models\WorkGroup;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class WorkGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $authUser = Auth::user();
        $workgroupListData = DB::table('work_groups as group')
            ->select(DB::raw('IFNULL(group.name, "") as name'), 'id')
            ->where('group.company_id', $authUser->companyid)
            ->where('group.is_active', 1)
            ->get();
        $workgroupList = array();
        foreach ($workgroupListData as $v) {
            if ($v->name != null) {
                $v->activeBtn = false;

                $workgroupList[] = $v;
            }
        }
        $permissions = Modules::premissions();
        return response()->json([
            'status' => 200,
            'permissions' => $permissions,
            'data' => $workgroupList
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function workGroupStore(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $authUser = Auth::user();
        $workGroup = new workGroup;

        $workGroup->company_id = $authUser->companyid;
        $workGroup->name = $request->name;
        $register = $workGroup->save();

        return response()->json([
            'status' => $register,
            'message' => 'Work group created successfully'
        ], 200);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function workGroupUpdate(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $put = workGroup::find($id);
        $put->name = $request->name;
        $put->save();

        return response()->json([
            'status' => $put,
            'message' => 'Work group updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function workGroupDestroy($id)
    {
        $delete = workGroup::findOrFail($id);
        $delete->is_active = 0;
        $delete->save();

        return response()->json([
            'status' => $delete,
            'message' => 'Work group deleted successfully'
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userList()
    {
        $authUser = Auth::user();

        $query = DB::table('users as u')
            ->join('roles as r', 'u.roleid', '=', 'r.id')
            ->join('employees as e', 'u.id', '=', 'e.userid')
            ->join('companies as c', 'u.companyid', '=', 'c.id')
            ->join('dropdown_items as dd', 'e.designation', '=', 'dd.id')
            ->select('u.id as user_id', 'u.is_active', 'u.phone', 'e.emp_id',
                DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as full_name"), 'u.companyid',
                'u.email', 'r.name as role_name', 'e.emp_id', 'dd.name as designation', 'u.propic', 'c.name as company_name')
            ->where('u.companyid', $authUser->companyid)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $query
        ], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function workGroupItemsShow($id)
    {
        $authUser = Auth::user();

        $query = DB::table('work_groups as g')
            ->leftJoin('users as user', 'g.user_id', '=', 'user.id')
            ->select(
                DB::raw("TRIM(CONCAT(user.first_name,' ',IFNULL(user.last_name, ''))) as full_name"),
                'user.id as user_id', 'g.parent_id', 'g.id as id'
            )
            ->where('g.company_id', $authUser->companyid)
            ->where('g.parent_id', $id)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $query
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function workGroupItemStore(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'parent_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $authUser = Auth::user();
        $group_members = [];

        foreach ($request->user_id as $item) {
            array_push($group_members,
                ['company_id' => $authUser->companyid, 'parent_id' => $request->parent_id, 'user_id' => $item]
            );
        }
        workGroup::insert($group_members);


        return response()->json([
            'status' => 200,
            'message' => 'Work group user ' . $request->user_name . ' added successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function workGroupItemDestroy($id)
    {
        $delete = workGroup::findOrFail($id);
        $delete->delete();

        return response()->json([
            'status' => $delete,
            'message' => 'Work group user deleted successfully'
        ], 200);
    }

}
