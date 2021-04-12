<?php


namespace App\Services;


use App\Models\Employee;
use App\Models\User;
use App\Models\WfActionLog;
use App\Models\WfProcess;
use App\Models\WfProcessDef;
use App\Models\WorkGroup;
use App\Notifications\ServiceRequestNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class WorkFlowService
{

    /**
     * Create new action
     * @param $request 'below parameters are mandatory
     *  1. module_id
     *  2. ref_id
     *  3. status
     *  4. remarks
     * @param int $req_id mandatory
     * @return void
     */
    public function setAction($request, int $req_id)
    {
        /**
         * Get users information
         */
        $auth_user = Auth::user();
        $module_id = $request->module_id;
        $ref_id = ($request->ref_id) ? (int)decryptId($request->ref_id) : null;
        $status = 0;
        $pending_to = null;
        $work_group_id = null;
        $actual_requester = null;
        $action_by = $auth_user->id;
        if ($request->is_for_other) {
            $action_by = $request->request_for;
            $actual_requester = $auth_user->id;
        }
        /**
         * Get Work Flow Process information
         */
        $wf_process = WfProcess::select('id')->where('module_id', $module_id)->firstOrFail();

        if ($ref_id) {
            $last_status = WfActionLog::select('status')->where('id', $ref_id)->firstOrFail();
            if ($last_status->status !== 0) {
                return;
            }

            //Update previous action status
            WfActionLog::where('id', $ref_id)->update(['status' => $request->status === 0 ? 1 : ($request->status === -2 ? -2 : -1)]);

            //Get Information of current action log
            $action_log = WfActionLog::select('id', 'ref_id', 'wf_process_id', 'wf_process_def_id', 'req_id', 'status', 'pending_to')
                                        ->where('id', $ref_id)->firstOrFail();

            //Get Original requester info
            $requester = DB::table('wf_action_logs as al')
                ->where([['al.wf_process_id', '=', $action_log->wf_process_id], ['al.req_id', '=', $action_log->req_id]])
                ->select('al.status', 'al.action_by')->first();

            $current_stage = WfProcessDef::select('id', 'sequence', 'final_stage')->where([['id', '=', $action_log->wf_process_def_id]])->firstOrFail();
            //DB::enableQueryLog(); // Enable query log
            $query = WfProcessDef::select('id', 'sequence', 'final_stage', 'approver', 'work_group_id')
                ->where([['company_id', '=', $auth_user->companyid],
                    ['wf_process_id', '=', $wf_process->id]
                ]);
            //dd($current_stage);

            if ($current_stage->final_stage === 1) {
                $query->where('sequence', '<', $current_stage->sequence);
            } elseif ($requester->status === -1 && $action_by === $requester->action_by) {
                $query->where('sequence', '<', $current_stage->sequence);
            } else {
                $query->where('sequence', '>', $current_stage->sequence);
            }
            $new_stage = $query->orderBy('sequence')->firstOrFail();

            //dd(DB::getQueryLog()); // Show results of log

            if ($action_log->status === 1) {
                $action_type = ($requester->action_by === $action_log->pending_to) ? ' rectified' : ' approved';

                if ($new_stage->final_stage !== 1) {

                    $next_stage = WfProcessDef::select('id', 'sequence', 'final_stage', 'approver', 'work_group_id')
                        ->where([['company_id', '=', $auth_user->companyid],
                            ['wf_process_id', '=', $wf_process->id],
                            ['sequence', '>', $new_stage->sequence]
                        ])->orderBy('sequence')->firstOrFail();

                    if ($next_stage->final_stage !== 1) {
                        if ($new_stage->approver) {
                            $pending_to = $new_stage->approver;

                            $mail_users = User::select('email')->where('id', $pending_to)->get();
                        } elseif ($new_stage->work_group_id) {
                            $work_group_id = $new_stage->work_group_id;

                            $wg_users = WorkGroup::select('user_id')->where('parent_id', $work_group_id)->get()->toArray();
                            $user_ids = [];
                            foreach ($wg_users as $item) {
                                array_push($user_ids, $item['user_id']);
                            }
                            $mail_users = User::select('email')->whereIn('id', $user_ids)->get();
                        } else {
                            $employee = Employee::select('supervisor')->where('userid', $action_by)->firstOrFail();
                            $pending_to = $employee->supervisor;

                            $mail_users = User::select('email')->where('id', $pending_to)->get();
                        }
                    } else {
                        /*$hr_admin = User::select('id')->where([['roleid', '=', CONST_ROLE_COMPANY_ADMIN], ['companyid', '=', $auth_user->companyid]])->firstOrFail();
                        $pending_to = $hr_admin->id;*/
                        $action_type = ($requester->action_by === $action_log->pending_to) ? ' rectified' : ' approved';
                        if ($next_stage->approver) {
                            $pending_to = $next_stage->approver;

                            $mail_users = User::select('email')->where('id', $pending_to)->get();
                        } elseif ($next_stage->work_group_id) {
                            $work_group_id = $next_stage->work_group_id;

                            $wg_users = WorkGroup::select('user_id')->where('parent_id', $work_group_id)->get()->toArray();
                            $user_ids = [];
                            foreach ($wg_users as $item) {
                                array_push($user_ids, $item['user_id']);
                            }
                            $mail_users = User::select('email')->whereIn('id', $user_ids)->get();
                        }
                    }
                } else {
                    /**
                     * Work flow process completes here
                     */
                    $status = 1;
                    $action_type = ' approved';
                    $mail_users = User::select('email')->where('id', $requester->action_by)->get();
                    /*if ($new_stage->approver) {
                        $pending_to = $new_stage->approver;
                    } elseif ($new_stage->work_group_id) {
                        $work_group_id = $new_stage->work_group_id;
                    } else {
                        $hr_admin = User::select('id')->where([['roleid', '=', CONST_ROLE_COMPANY_ADMIN], ['companyid', '=', $auth_user->companyid]])->firstOrFail();
                        $pending_to = $hr_admin->id;
                    }*/
                }
            } elseif ($action_log->status === -2) {
                $status = 1;
                $action_type = ' cancelled';
                $mail_users = User::select('email')->where('id', $requester->action_by)->get();
            } else {
                $pending_to = $requester->action_by;
                $action_type = ' rejected';
                $mail_users = User::select('email')->where('id', $pending_to)->get();
            }

        } else {
            //DB::enableQueryLog(); // Enable query log
            $new_stage = WfProcessDef::select('id', 'sequence', 'final_stage', 'approver', 'work_group_id')
                ->where([['company_id', '=', $auth_user->companyid],
                    ['wf_process_id', '=', $wf_process->id]
                ])
                ->orderBy('sequence')
                ->firstOrFail();
            //dd(DB::getQueryLog()); // Show results of log
            $action_type = ' sent';
            if ($new_stage->approver) {
                $pending_to = $new_stage->approver;

                $mail_users = User::select('email')->where('id', $pending_to)->get();
            } elseif ($new_stage->work_group_id) {
                $work_group_id = $new_stage->work_group_id;

                $wg_users = WorkGroup::select('user_id')->where('parent_id', $work_group_id)->get()->toArray();
                $user_ids = [];
                foreach ($wg_users as $item) {
                    array_push($user_ids, $item['user_id']);
                }
                $mail_users = User::select('email')->whereIn('id', $user_ids)->get();
            } else {
                $employee = Employee::select('supervisor')->where('userid', $action_by)->firstOrFail();
                $pending_to = $employee->supervisor;

                $mail_users = User::select('email')->where('id', $pending_to)->get();
            }
            //dd($mail_users);
        }

        $action_log = WfActionLog::create([
            'wf_process_id' => (int)$wf_process->id,
            'wf_process_def_id' => (int)$new_stage->id,
            'ref_id' => $ref_id,
            'req_id' => (int)$req_id,
            'status' => $status,
            'action_by' => $action_by,
            'actual_requester' => $actual_requester,
            'pending_to' => $pending_to,
            'work_group_id' => $work_group_id,
            'remarks' => stripcslashes(strip_tags($request->remarks)),
            'official_create_time' => null,
        ]);

        /**
         * Finally send mail notification
         *
         */
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
        $mail_data = [
            'action' => $service_name->name . ' '. $request_id . $action_type . ' by ' . $employee->request_by_name,
            'url' => $service_name->url . '?id=' . $req_id . '&request_id=' . $request_id . '&ref_id=' . $ref_id,
            //'employee' => $employee->request_by_name,
            'request_id' => $request_id,
            'model_name' => 'WfActionLog',
            'service_request' => $action_log
        ];

        Notification::send($mail_users, new ServiceRequestNotification($mail_data));
    }
}

