<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of My Pending.
     *
     * @param int $other '1 means the API is requested for Other pending data
     * $other = 0 means My pending data
     * @return \Illuminate\Http\JsonResponse
     */
    public function pending(int $other = 0)
    {
        $auth_user = Auth()->user();
        //DB::enableQueryLog(); // Enable query log
        $pending_query = DB::table('wf_action_logs as al')
            ->join('wf_process_defs as pd', 'al.wf_process_def_id', 'pd.id')
            ->join('wf_processes as wp', 'pd.wf_process_id', 'wp.id')
            ->leftJoin('users as u', 'al.pending_to', 'u.id')
            ->leftJoin('users as u1', 'al.action_by', 'u1.id')
            ->leftJoin('users as u2', 'al.actual_requester', 'u2.id')
            ->leftJoin('work_groups as wg', 'al.work_group_id', 'wg.id')
            ->join('modules as m', 'wp.module_id', 'm.id')
            ->select('al.id as ref_id', 'al.req_id', 'm.url', 'wg.name',
                DB::raw("CONCAT(wp.name,' ', pd.pending_text) as pending_for"),
                DB::raw("CONCAT(m.prefix,lpad(al.req_id, 5, '0')) as request_id"),
                DB::raw("CONCAT(TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))), ' (', u.email, ')' ) as pending_full_name"),
                DB::raw("(CASE WHEN wg.name IS NULL THEN CONCAT(TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))), ' (', u.email, ')' ) ELSE wg.name END) as pending_to_name"),
                DB::raw("CONCAT(TRIM(CONCAT(u1.first_name,' ',IFNULL(u1.last_name, ''))), ' (', u1.email, ')' ) as request_by_name"),
                #DB::raw("(SELECT CONCAT(TRIM(CONCAT(`u1`.`first_name`,' ',IFNULL(`u1`.`last_name`, ''))), ' (', `u1`.`email`, ')' ) from `users` as `u1` where `al`.`ref_id` is null and `u1`.`id` = al.`action_by`) as `request_by_name`"),
                DB::raw("DATE_FORMAT(al.`created_at`, '%d-%b-%Y %H:%i:%s') AS created_at")
            )
            ->where('al.status', 0);

        if ($other === 1) {
            $pending_query->where(function ($q) use ($auth_user) {
                $q->where('al.action_by', $auth_user->id)
                    ->orWhere('al.actual_requester', $auth_user->id)
                    ->orWhere('al.work_group_id', '=', DB::raw('(select wg1.`parent_id` from `work_groups` as `wg1` where `wg1`.`parent_id` = `al`.`work_group_id` and wg1.`user_id` = ' . $auth_user->id . ' limit 1)'));
            });
        } else {
            $pending_query->where(function ($q) use ($auth_user) {
                $q->where('al.pending_to', $auth_user->id)
                    ->orWhere('al.work_group_id', '=', DB::raw('(select wg1.`parent_id` from `work_groups` as `wg1` where `wg1`.`parent_id` = `al`.`work_group_id` and wg1.`user_id` = ' . $auth_user->id . ' limit 1)'));
            });
        }
        $pending = $pending_query->orderBy('al.id', 'desc')->get();
        //dd(DB::getQueryLog()); // Show results of log

        $pending->each(function (&$item) {
            $item->ref_id = encryptId($item->ref_id);
            $item->req_id = encryptId($item->req_id);
        });


        return response()->json(['pending' => $pending]);
    }
}
