<?php

namespace App\Http\Controllers\app\user;

use App\Http\Controllers\Controller;
use App\Models\Educationhistory;
use App\Models\Employee;
use App\Models\Jobhistory;
use App\Models\Nominee;
use App\Models\Skillmatrice;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserListController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }

    /**
     * Get All users of Logged in Admins Company
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function data(Request $request)
    {

        try {
            $nth_items = 10;
            $is_active = $request->is_active;
            $sort_column = $request->sort_column;
            $sort_direction = $request->sort_direction;
            $search = $request->q;
            $auth_user = Auth::user();

            //DB::enableQueryLog(); // Enable query log
            $query = DB::table('users as u')
                ->join('roles as r', 'u.roleid', '=', 'r.id')
                ->leftJoin('employees as e', 'u.id', '=', 'e.userid')
                ->join('companies as c', 'u.companyid', '=', 'c.id')
                ->leftJoin('dropdown_items as dd', 'e.designation', '=', 'dd.id')
                ->select('u.id as user_id', 'u.is_active', 'u.email', 'u.propic',
                    DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as full_name"), 'u.companyid',
                    'r.name as role_name', 'e.emp_id', 'dd.name as designation', 'c.name as company_name');

            if ($auth_user->roleid == CONST_ROLE_DEVELOPER ||
                $auth_user->roleid == CONST_ROLE_SUPER_ADMIN ) {
                $query->where('u.roleid', '=', CONST_ROLE_COMPANY_ADMIN);
            }else{
                $query->where('u.companyid', '=', $auth_user->companyid);
            }


            //Filter using is_active
            if ($is_active != -1) {
                $query->where('u.is_active', '=', $is_active);
            }

            //Search data in the tables
            if ($search) {
                $query->where('u.first_name', 'like', '%' . $search . '%')
                    ->orWhere('u.last_name', 'like', '%' . $search . '%')
                    ->orWhere('r.name', 'like', '%' . $search . '%');
            }

            //Sort rows in ASC/desc order
            if ($sort_column && $sort_direction) {
                $query->orderBy($sort_column, $sort_direction);
            }

            $users = $query->paginate($nth_items);

            //dd(DB::getQueryLog()); // Show results of log

            $array_logs = $users->toArray();
            foreach ($array_logs['data'] as $r => $record) {
                $user_id = $record->user_id;
                //dd($record);
                $record->active_status = ($record->is_active == 1) ? 'Active' : 'Inactive';
                $record->user_id = encryptId($user_id);
                if ($record->propic != null || $record->propic != '') {
                    $record->pro_pic = '/storage/company-' . $record->companyid . '/user-' . $user_id . '/' . $record->propic;
                } else {
                    $record->pro_pic = '/storage/default/propic.jpg';
                }

            }
            return response()->json([
                'users' => $users,
                'status' => 200,
                'message' => 'Successfully fetched rows',
                'error' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 500);
        }
    }

    /**
     * Update User 'is_active' status
     * If we get is_active = 1 then deactivate the User
     * If we get is_active = 0 then active the User
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeUserActive(Request $request)
    {
        //$input = $request->all();
        $input = [];
        $input['id'] = (int)decryptId( $request->id);
        $input['is_active'] = $request->is_active;
        $input['company_id'] = $request->company_id;

        $validator = Validator::make($input, [
            'id' => 'required|integer',
            'is_active' => 'required|integer',
            'company_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $auth_user = Auth::user();

        if ($request->is_active == 1){
            $new_status = 0;
            $status_txt = "De-Activated";
        }else{
            $new_status = 1;
            $status_txt = "Activated";
        }

        if (($auth_user->roleid == CONST_ROLE_DEVELOPER ||
                $auth_user->roleid == CONST_ROLE_SUPER_ADMIN) ||
            $auth_user->companyid == $request->company_id) {

            $user = User::findOrFail($input['id']);
            $user->is_active = $new_status;
            $user->save();

            return response()->json(['message' => "User has been $status_txt successfully."], 200);
        }
        return response()->json(['message' => "You may not have the right permission"], 404);
    }

    /**
     * Update User 'is_active' status
     * Get user list in drop down
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function userList(Request $request)

    {
        $head = $request->head;
        try {
            $auth_user = Auth::user();

            //DB::enableQueryLog(); // Enable query log
            $query = DB::table('users as u')
                ->leftJoin('organizationtrees as org','u.id','org.organizationhead');


            if ($auth_user->roleid !== CONST_ROLE_DEVELOPER ||
                $auth_user->roleid !== CONST_ROLE_SUPER_ADMIN )
            {
                $query->where('u.companyid', '=', $auth_user->companyid);
            }

            if ($head == 1){
                $query->where('org.id','!=',null);
            }elseif($head == 2){
                $query->where('org.id','=',null);
            }

            $users = $query->select('u.id', 'u.is_active',
                DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as full_name"))
                ->orderBy('u.first_name', 'asc')
                ->get();



            return response()->json([
                'users' => $users,
                'status' => 200,
                'message' => 'Successfully fetched rows',
                'error' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 500);
        }
    }

    public function deleteUser(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required|max:32',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }
        try {
            \DB::beginTransaction();

            $targetUser = User::find($input['id']);
            if ($targetUser) {
                $targetCompany = Company::find($targetUser->companyid);
                $authData = Auth::user();
                if ($targetUser->roleid == CONST_ROLE_DEVELOPER ||
                    $targetUser->roleid == CONST_ROLE_SUPER_ADMIN ||
                    $targetCompany->adminid == $targetUser->id) {
                    return response()->json(['errors' => 'Not permitted'], 403);
                }
                Educationhistory::where('userid', $targetUser->id)->delete();

                Nominee::where('userid', $targetUser->id)->delete();
                Jobhistory::where('userid', $targetUser->id)->delete();
                Skillmatrice::where('userid', $targetUser->id)->delete();
                Employee::where('userid', $targetUser->id)->delete();
                $proPicPath = 'public/company-' . $authData->companyid . '/user-' . $input['id'];
                Storage::deleteDirectory($proPicPath);
                $delete = User::destroy($input['id']);

                \DB::commit();
                return response()->json([
                    $delete,
                    'message'=> "User deleted successfully."
                ], 200);
            } else {
                return response()->json([
                    'message' => "Not Found"
                ], 404);
            }


        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }


    }
}
