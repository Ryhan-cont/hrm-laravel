<?php

namespace App\Observers;

use App\Models\User;
use App\Models\WfProcess;
use App\Models\WorkGroup;
use App\Notifications\ServiceRequestNotification;
use App\Models\WfActionLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class ServiceRequestObserver
{
    public function created(WfActionLog $action_log)
    {
        /*$users = \App\User::whereHas('roles', function ($q) {
            return $q->where('title', 'Admin');
        })->get();*/

        //Get Original requester info
        $requester = DB::table('wf_action_logs as al')
            ->where([['al.wf_process_id', '=', $action_log->wf_process_id], ['al.req_id', '=', $action_log->req_id]])
            ->select('al.status', 'al.action_by')->first();
        dd($action_log);
        if ($action_log->pending_to) {
            $users = User::select('email')->where('id', $action_log->pending_to)->get();
        } elseif ($action_log->work_group_id) {
            $wg_users = WorkGroup::select('user_id')->where('parent_id', $action_log->work_group_id)->get()->toArray();

            $user_ids = [];
            foreach ($wg_users as $item) {
                array_push($user_ids, $item['user_id']);
            }

            //DB::enableQueryLog(); // Enable query log
            $users = User::select('email')->whereIn('id', $user_ids)->get();
            //dd(DB::getQueryLog()); // Show results of log

            /*$users = DB::table('users as u')
                ->join('work_groups as wg', 'u.id', 'wg.user_id')
                ->where([['wg.parent_id', $action_log->work_group_id]])
                ->select('u.email')->get();*/
            //dd($users);
        }

        $service_name = DB::table('wf_processes as wp')
            ->select('wp.name', 'm.url', 'm.prefix')
            ->join('modules as m', 'wp.module_id', 'm.id')
            ->where('wp.id', $action_log->wf_process_id)
            ->first();
        $employee = DB::table('users as u')
            ->select(DB::raw("CONCAT(TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))), ' (', e.emp_id, ')' ) as request_by_name"),)
            ->join('employees as e', 'u.id', 'e.userid')
            ->where('u.id', $action_log->action_by)
            ->first();

        $req_id = encryptId($action_log->req_id);
        $ref_id = encryptId($action_log->id);
        $request_id = $service_name->prefix . str_pad($action_log->req_id, 5, '0', STR_PAD_LEFT);//Request ID with lpad e.g: SR00001

        $data = [
            'action' => $service_name->name . ' sent by ' . $employee->request_by_name,
            'url' => $service_name->url . '?id=' . $req_id . '&request_id=' . $request_id . '&ref_id=' . $ref_id,
            'employee' => $employee->request_by_name,
            'request_id' => $request_id,
            'model_name' => 'WfActionLog',
            'service_request' => $action_log
        ];

        //dd($users->email);
        Notification::send($users, new ServiceRequestNotification($data));

    }
}
