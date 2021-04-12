<?php

namespace App\Http\Controllers\workflow;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Classes\Modules;
use App\Models\WfProcessDef;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class WfProcessDefController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $authUser = Auth::user();
        $workflowProcessList = DB::table('wf_processes as process')
            ->select('id', 'process.module_id as moduleId', 'name')
            ->get();

            $permissions = Modules::premissions();

            return response()->json([
                'status' => 200,
                'permissions' => $permissions,
                'data' => $workflowProcessList
            ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function workflowItemStore(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'reject_text' => 'required|max:128',
            'pending_text' => 'required|max:128',
            'accept_text' => 'required|max:128',
            //'email_cc' => 'required',
            'final_stage' => 'required|boolean',

            'wf_process_id' => 'required|integer',
            'id' => 'required',

            'sequence' => 'required|integer',
            'sla' => 'required|integer',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $authUser = Auth::user();
        if($request->id == 'create-first'){
            $serialized = array(
                array(
                    'storeType' => 'new',
                    'sequenceNew' => 1,
                )
            );
        }else{
            $serialized = $this->serialized($request->wf_process_id,$request->id);
        }
        try {
            DB::beginTransaction();
            foreach($serialized as $v){
                if($v['storeType'] == 'update'){
                    if($v['sequence'] != $v['sequenceNew']){
                        $put = WfProcessDef::findOrFail($v['id']);
                        if($put){
                            $put->sequence = $v['sequenceNew'];
                        }
                        $put->save();
                    }
                }
                if($v['storeType'] == 'new'){
                    $newWorkDef = new WfProcessDef;
                    $newWorkDef->company_id = $authUser->companyid;
                    $newWorkDef->wf_process_id = $request->wf_process_id;
                    $newWorkDef->sequence = $v['sequenceNew'];
                    $newWorkDef->approver = $request->approver;
                    $newWorkDef->work_group_id = $request->work_group_id;
                    $newWorkDef->final_stage = $request->final_stage;
                    $newWorkDef->accept_text = $request->accept_text;
                    $newWorkDef->reject_text = $request->reject_text;
                    $newWorkDef->pending_text = $request->pending_text;
                    $newWorkDef->sla_type = $request->sla_type;
                    $newWorkDef->sla = $request->sla;
                    $newWorkDef->sla_minutes = $request->sla_minutes;
                    $newWorkDef->email_cc = $request->email_cc;

                    $register = $newWorkDef->save();

                }
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'status' => $register,
            'message' => 'Workflow process created successfully'
         ], 200);
    }

    public function serialized($processId,$id)
    {


        $authUser = Auth::user();

        $query = DB::table('wf_process_defs as defs')
            ->select('id', 'company_id', 'wf_process_id', 'sequence',
                'approver', 'work_group_id', 'final_stage', 'accept_text',
                'pending_text', 'reject_text', 'sla', 'email_cc',
            )
            ->where('defs.company_id', $authUser->companyid)
            ->where('defs.wf_process_id', $processId)
            ->get();

        $query = json_decode(json_encode($query), true);

        usort($query, function ($a, $b) {
            return $a['sequence'] - $b['sequence'];
        });

        $newSeq = 1;
        $newFormetedArr = array();
        foreach ($query as $v) {
            $v['storeType'] = 'update';
            $v['sequenceNew'] = $newSeq;
            $newSeq++;
            $newFormetedArr[] = $v;

            if ($id == $v['id']) {
                $subArr = [
                    'storeType' => 'new',
                    'sequenceNew' => $newSeq,
                ];
                $newSeq++;
                $newFormetedArr[] = $subArr;
            }
        }

        return $newFormetedArr;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function workflowGroupItemsShow($id)
    {
        $authUser = Auth::user();

        $query = DB::table('wf_process_defs as pd')
            ->select('pd.id', 'pd.company_id', 'pd.wf_process_id', 'pd.sequence', 'pd.approver', 'pd.work_group_id',
                'pd.final_stage', 'pd.accept_text', 'pd.pending_text', 'pd.reject_text', 'pd.sla_type', 'pd.sla', 'pd.email_cc',
                DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as approver_name"),
                DB::raw("IFNULL(g.name, '') as group_name")
            )
            ->leftJoin('users as u', 'pd.approver', '=', 'u.id')
            ->leftJoin('work_groups as g', 'pd.work_group_id', '=', 'g.id')
            ->where('pd.company_id', $authUser->companyid)
            ->where('pd.wf_process_id', $id)
            ->get();


        $query = json_decode(json_encode($query), true);

        usort($query, function ($a, $b) {
            return $a['sequence'] - $b['sequence'];
        });

        return response()->json([
            'status' => 200,
            'data' => $query
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function workflowItemUpdate(Request $request, $id)
    {
        $input = $request->all();

        $workflowDef = WfProcessDef::findOrFail($id);
        if($workflowDef){
            if(isset($input['approver'])){$workflowDef->approver = $request->approver;}
            if(isset($input['work_group_id'])){$workflowDef->work_group_id = $request->work_group_id;}
            if(isset($input['final_stage'])){$workflowDef->final_stage = $request->final_stage;}
            if(isset($input['accept_text'])){$workflowDef->accept_text = $request->accept_text;}
            if(isset($input['reject_text'])){$workflowDef->reject_text = $request->reject_text;}
            if(isset($input['pending_text'])){$workflowDef->pending_text = $request->pending_text;}
            if(isset($input['sla_type'])){$workflowDef->sla_type = $request->sla_type;}
            if(isset($input['sla'])){$workflowDef->sla = $request->sla;}
            if(isset($input['sla_minutes'])){$workflowDef->sla_minutes = $request->sla_minutes;}
            if(isset($input['email_cc'])){$workflowDef->email_cc = $request->email_cc;}

            $register = $workflowDef->save();
        }

        return response()->json([
            'status' => $register,
            'message' => 'Workflow process updated successfully'
         ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function workflowItemDestroy($id)
    {
        $workflowDef = WfProcessDef::findOrFail($id);
        if($workflowDef){
            $wf_process_id = $workflowDef->wf_process_id;
            try {
                DB::beginTransaction();

                $delete = $workflowDef->delete();

                $serialized = $this->serialized($wf_process_id,null);
                foreach($serialized as $v){
                    if($v['storeType'] == 'update'){
                        if($v['sequence'] != $v['sequenceNew']){
                            $put = WfProcessDef::find($v['id']);
                            if($put){
                                $put->sequence = $v['sequenceNew'];
                            }
                            $put->save();
                        }
                    }
                }
                DB::commit();
            } catch (Exception $e) {
                DB::rollback();
                return response()->json([
                    'message' => $e->getMessage(),
                ], 500);
            }
            return response()->json([
                'status' => $delete,
                'message' => 'Workflow process deleted successfully'
             ], 200);
        }
    }
}
