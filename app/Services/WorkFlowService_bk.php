<?php


namespace App\Services;


use App\Models\Employee;
use App\Models\User;
use App\Models\WfActionLog;
use App\Models\WfProcess;
use App\Models\WfProcessDef;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WorkFlowService_bk
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
        $ref_id = ($request->ref_id) ? decryptId($request->ref_id) : null;
        $status = 0;
        $pending_to = null;
        $work_group_id = null;
        $actual_requester = null;
        $action_by = $auth_user->id;
        if ($request->is_for_other){
            $action_by = $request->request_for;
            $actual_requester = $auth_user->id;
        }
        /**
         * Get Work Flow Process information
         */
        $wf_process = WfProcess::select('id')->where('module_id', $module_id)->firstOrFail();

        if ($ref_id) {
            //Update previous action status
            //WfActionLog::where('id', (int)$ref_id)->update(['status' => ($request->status === 0) ? 1 : -1]);
            WfActionLog::where('id', (int)$ref_id)->update(['status' => $request->status === 0  ? 1 : ($request->status === -2 ? -2 : -1)]);

            //Get Information of current action log
            $action_log = WfActionLog::select('id', 'ref_id', 'wf_process_id', 'wf_process_def_id', 'req_id', 'status')->where('id', (int)$ref_id)->firstOrFail();
            //dd($action_log);
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

            //if ($current_stage->final_stage === 1 || $action_log->status === -1) {
            if ($current_stage->final_stage === 1) {
                $query->where('sequence', '<', $current_stage->sequence );
            }elseif ($requester->status === -1 && $action_by === $requester->action_by){
                $query->where('sequence', '<', $current_stage->sequence);
            } else {
                $query->where('sequence', '>', $current_stage->sequence);
            }
            $new_stage = $query->orderBy('sequence')->firstOrFail();

            //dd(DB::getQueryLog()); // Show results of log

            if ($action_log->status === 1) {

                if ($new_stage->final_stage !== 1) {

                    $next_stage = WfProcessDef::select('id', 'sequence', 'final_stage', 'approver', 'work_group_id')
                        ->where([['company_id', '=', $auth_user->companyid],
                            ['wf_process_id', '=', $wf_process->id],
                            ['sequence', '>', $new_stage->sequence]
                        ])->orderBy('sequence')->firstOrFail();

                    if ($next_stage->final_stage !== 1) {
                        if ($new_stage->approver) {
                            $pending_to = $new_stage->approver;
                        } elseif ($new_stage->work_group_id) {
                            $work_group_id = $new_stage->work_group_id;
                        } else {
                            $employee = Employee::select('supervisor')->where('userid', $action_by)->firstOrFail();
                            $pending_to = $employee->supervisor;
                        }
                    } else {
                        /*$hr_admin = User::select('id')->where([['roleid', '=', CONST_ROLE_COMPANY_ADMIN], ['companyid', '=', $auth_user->companyid]])->firstOrFail();
                        $pending_to = $hr_admin->id;*/
                        if ($next_stage->approver) {
                            $pending_to = $next_stage->approver;
                        } elseif ($next_stage->work_group_id) {
                            $work_group_id = $next_stage->work_group_id;
                        }
                    }
                } else {
                    $status = 1;
                    /*if ($new_stage->approver) {
                        $pending_to = $new_stage->approver;
                    } elseif ($new_stage->work_group_id) {
                        $work_group_id = $new_stage->work_group_id;
                    } else {
                        $hr_admin = User::select('id')->where([['roleid', '=', CONST_ROLE_COMPANY_ADMIN], ['companyid', '=', $auth_user->companyid]])->firstOrFail();
                        $pending_to = $hr_admin->id;
                    }*/
                }
            }elseif ($action_log->status === -2){
                $status = 1;
            } else {
                $pending_to = $requester->action_by;
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
            if ($new_stage->approver) {
                $pending_to = $new_stage->approver;
            } elseif ($new_stage->work_group_id) {
                $work_group_id = $new_stage->work_group_id;
            } else {
                $employee = Employee::select('supervisor')->where('userid', $action_by)->firstOrFail();
                $pending_to = $employee->supervisor;
            }
            //dd($new_stage);
        }

        WfActionLog::create([
            'wf_process_id' => (int) $wf_process->id,
            'wf_process_def_id' => (int) $new_stage->id,
            'ref_id' => ($ref_id) ? (int) $ref_id : $ref_id,
            'req_id' => (int) $req_id,
            'status' => $status,
            'action_by' => $action_by,
            'actual_requester' => $actual_requester,
            'pending_to' => $pending_to,
            'work_group_id' => $work_group_id,
            'remarks' => stripcslashes(strip_tags($request->remarks)),
            'official_create_time' => null,
        ]);
    }
}

