<?php

namespace App\Http\Controllers\workflow;

use App\Http\Controllers\Controller;
use App\Models\WfActionLog;
use App\Models\WorkGroup;
use App\Services\WorkFlowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class WfActionLogController extends Controller
{
    /**
     * Call the Work flow service class for full controller
     *
     * @return \Illuminate\Http\Response
     */
    private $workFlow;

    public function __construct(WorkFlowService $work_flow)
    {
        $this->middleware('auth');
        $this->workFlow = $work_flow;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        $req_id = decryptId($request->req_id);

        try {
            DB::beginTransaction();
            $this->workFlow->setAction($request, $req_id);

            $response['data'] = '';
            $response['message'] = 'Action processed successfully';
            DB::commit();
            return response()->json($response);
        } catch (Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();
            return response()->json($response, 500);
        }
    }

    /**
     * Display a listing of Action Log.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function activityTimeline(string $id)
    {
        $id = (int)decryptId($id);
        $action_log = WfActionLog::select('id', 'req_id', 'wf_process_id')->where('id', (int)$id)->firstOrFail();
        //DB::enableQueryLog(); // Enable query log
        $query = DB::table('wf_action_logs as al')
            ->join('wf_process_defs as pd', 'al.wf_process_def_id', 'pd.id')
            ->join('wf_processes as wp', 'pd.wf_process_id', 'wp.id')
            ->join('users as u', 'al.action_by', 'u.id')
            ->leftJoin('users as u1', 'al.actual_requester', 'u1.id')
            ->join('modules as m', 'wp.module_id', 'm.id')
            ->where([['al.req_id', $action_log->req_id],['al.wf_process_id', $action_log->wf_process_id]])
            ->select('al.id', 'al.ref_id', 'al.remarks', 'al.status', 'pd.final_stage', 'wp.name as flow_name',
                'pd.accept_text', 'pd.reject_text',
                DB::raw('(SELECT `al2`.`status` from `wf_action_logs` as `al2` where `al2`.`id` = `al`.`ref_id`) as `prev_status`'),
                DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as action_by_name"),
                DB::raw("TRIM(CONCAT(u1.first_name,' ',IFNULL(u1.last_name, ''))) as actual_requester_name"),
                DB::raw("DATE_FORMAT(al.created_at, '%d-%b-%Y %H:%i:%s') as created_at")
            );

        $timeline_data = $query->orderBy('al.id')->get();
        //dd(DB::getQueryLog()); // Show results of log

        $timeline_data->each(function (&$item, $key) {
            $item->id = encryptId($item->id);
            if ($item->prev_status === 1) {
                if ($item->final_stage === 1) {
                    $item->color = 'success';
                    $item->icon = 'CheckIcon';
                    $item->action_text = $item->flow_name . ' ' . $item->accept_text;
                } else {
                    $item->color = 'primary';
                    $item->icon = 'PlusIcon';
                    $item->action_text = $item->flow_name . ' ' . $item->accept_text;
                }
            } elseif ($item->prev_status === -1) {
                $item->color = 'danger';
                $item->icon = 'AlertCircleIcon';
                $item->action_text = $item->flow_name . ' ' . $item->reject_text;
            } elseif ($item->prev_status === -2) {
                $item->color = 'warning';
                $item->icon = 'XIcon';
                $item->action_text = $item->flow_name . ' ' . $item->reject_text;
            } else {
                $item->color = 'primary';
                $item->icon = 'PlusIcon';
                $item->action_text = $item->flow_name . ' ' . $item->accept_text;
            }
        });


        return response()->json(['timeline_data' => $timeline_data]);
    }

    /**
     * Check if the user can edit data and have action buttons
     * @param $id
     */
    public function checkEditable($id)
    {
        $id = (int)decryptId($id);
        //DB::enableQueryLog(); // Enable query log
        $action_log = WfActionLog::select('id', 'req_id', 'wf_process_id', 'pending_to', 'work_group_id')->where('id', (int)$id)->firstOrFail();

        $requester = DB::table('wf_action_logs as al')
            ->where([['al.wf_process_id', '=', $action_log->wf_process_id], ['al.req_id', '=', $action_log->req_id]])
            ->select('al.action_by', 'al.status')
            ->orderBy('al.id')
            ->first();
        //dd(DB::getQueryLog()); // Show results of log
        $auth_user = auth()->user();
        $request_info = ['action_buttons' => false, 'edit_info' => false];
        if ($action_log->work_group_id) {
            $work_group = WorkGroup::select('id')->where([['parent_id', '=', $action_log->work_group_id],['user_id', '=',  $auth_user->id]])->firstOrFail();
            if ($work_group->id){
                $request_info['action_buttons'] = true;
                $request_info['edit_info'] = false;
            }
        }else{
            if ($action_log->pending_to === $requester->action_by && ($requester->action_by === $auth_user->id)) {
                $request_info['action_buttons'] = false;
                $request_info['edit_info'] = true;
            } elseif ($action_log->pending_to === $auth_user->id && $requester->action_by !== $action_log->pending_to) {
                $request_info['action_buttons'] = true;
                $request_info['edit_info'] = false;
            }
        }

        return response()->json(['request_info' => $request_info]);
    }
}
