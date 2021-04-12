<?php

namespace App\Http\Controllers\service;

use App\Http\Controllers\Controller;
use App\Models\LeaveApplication;
use App\Models\Leavepackage;
use App\Services\WorkFlowService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LeaveApplicationController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $authUser = Auth()->user();

        //Validate the request data
        $inputs = $request->all();
        $validator = Validator::make($inputs, [
            'leave_type' => 'required|integer',
            'reason' => 'required|integer',
            'remarks' => 'nullable|string|max:512',
        ]);

        $leave_type = stripcslashes(strip_tags($inputs['leave_type']));
        $reason = stripcslashes(strip_tags($inputs['reason']));
        $start_date = stripcslashes(strip_tags($inputs['start_date']));
        $end_date = stripcslashes(strip_tags($inputs['end_date']));
        $remark = stripcslashes(strip_tags($inputs['remarks']));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user_id = $authUser->id;
        if ($inputs['is_for_other']){
            $user_id = $inputs['request_for'];
        }
        $checkRequest = LeaveApplication::where('company_id',$authUser->companyid)->where('user_id',$user_id)->whereIn('status',[0,-1])->count();
        if ($checkRequest > 0 && CONST_REQUEST_PROHIBIT){
            return response()->json([
                'message' => 'Already a requested is in process',
            ], 406);
        }
        try {
            DB::beginTransaction();

            /**
             * Insert request data to the "id_card_requests" table
             * ****************************************************/
            $card_request = LeaveApplication::create([
                'company_id' => $authUser->companyid,
                'user_id' => $user_id,
                'leave_type' => $leave_type,
                'reason' => $reason,
                'start_date' => date('Y-m-d', strtotime($start_date)),
                'end_date' => date('Y-m-d', strtotime($end_date)),
                'remarks' => $remark,
            ]);

            $this->workFlow->setAction($request, $card_request['id']);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Leave request sent successfully';

            return response()->json($response, 200);
        } catch (Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();

            return response()->json($response, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $req_id = (int)decryptId($id);
        $target  = LeaveApplication::find($req_id);

        $response = DB::table('leave_applications as la')
            ->leftJoin('leavepackages as lp', 'lp.id', 'la.leave_type')
            ->select('la.id','lp.type', 'lp.balance', 'la.status',
                'la.start_date as start_date', 'la.end_date as end_date',
            )
            ->where('la.user_id', $target->user_id)
            ->orderBy('la.created_at')
            ->get();

        $used = 0;

        foreach ($response->where('la.status', 1) as $r) {

            $to = Carbon::createFromFormat('Y-m-d', $r->start_date);
            $from = Carbon::createFromFormat('Y-m-d', $r->end_date);
            $diff_in_days = $to->diffInDays($from);
            $used = $used + $diff_in_days +1;

        }
        $to = Carbon::createFromFormat('Y-m-d', $target->start_date);
        $from = Carbon::createFromFormat('Y-m-d', $target->end_date);
        $requested_for= $to->diffInDays($from);

        return response()->json([
            'type_id' => $target->leave_type,
            'reason_id' => $target->reason,
            'type_name' => $response[0]->type,
            'requested_for' => $requested_for +1,
            'total' => $response[0]->balance,
            'used' => $used,
            'available' => $response[0]->balance - $used,
            'form_start_date' => date("j F, Y",strtotime($target->start_date)),
            'form_end_date' => date("j F, Y",strtotime($target->end_date)),
            'start_date' => $target->start_date,
            'end_date' => $target->end_date,
            'remarks' => $target->remarks,
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
    public function update(Request $request, string $id)
    {
        $req_id = decryptId($id);
        $inputs = $request->all();
        $validator = Validator::make($inputs, [
            'leave_type' => 'required|integer',
            'reason' => 'required|integer',
            'remarks' => 'nullable|string|max:512',
        ]);

        $leave_type = stripcslashes(strip_tags($inputs['leave_type']));
        $reason = stripcslashes(strip_tags($inputs['reason']));
        $start_date = stripcslashes(strip_tags($inputs['start_date']));
        $end_date = stripcslashes(strip_tags($inputs['end_date']));
        $remark = stripcslashes(strip_tags($inputs['remarks']));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $card_request = LeaveApplication::where('id', $req_id)->firstOrfail();
        if (!$card_request) {
            return response()->json(['message' => 'Data not found with given request ID'], 204);
        }

        try {
            DB::beginTransaction();

            /**
             * Update request data to the "business_card" table
             * ****************************************************/
            $card_request->leave_type = $leave_type;
            $card_request->reason = $reason;
            $card_request->start_date = date('Y-m-d', strtotime($start_date));
            $card_request->end_date = date('Y-m-d', strtotime($end_date));
            $card_request->remarks = $remark;
            $card_request->save();

            $this->workFlow->setAction($request, $req_id);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Leave request updated successfully';
            return response()->json($response);
        } catch (\Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();

            return response()->json($response, 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function LeavePackage()
    {
        $auth_user = auth()->user();
        $package = DB::table('employees as em')
            ->leftJoin('masterpackages as ma', 'em.leavepackage', 'ma.id')
            ->leftJoin('leavepackages as le', 'ma.id', 'le.sourceid')
            ->select('le.id as value', 'le.type as label', 'le.balance as days')
            ->where('userid', $auth_user->id)
            ->get();
        return response()->json(['items' => $package], 200);
    }

    public function LeaveCheck($id)
    {
        $auth_user = auth()->user();
        $pack = Leavepackage::find((int)$id);



        $response = DB::table('leave_applications as la')
            ->leftJoin('leavepackages as lp', 'lp.id', 'la.leave_type')
            ->select('la.id','lp.type', 'lp.balance', 'la.status', 'la.start_date as start_date', 'la.end_date as end_date')
            ->where('user_id', $auth_user->id)->where('leave_type', $pack->id)->where('la.status', 1)
            ->orderBy('la.created_at')
            ->get();

        $used = 0;

        foreach ($response as $r) {

            $to = Carbon::createFromFormat('Y-m-d', $r->start_date);
            $from = Carbon::createFromFormat('Y-m-d', $r->end_date);
            $diff_in_days = $to->diffInDays($from);
            $used = $used + $diff_in_days+1;

        }
        $total = $pack->balance;
        $available = $total - $used;
        if ($available <= 0){
            $info = false;
        }else{
            $info = true;
        }

        return response()->json([
            'info' => $info,
            'total' => $total,
            'used' => $used,
            'available' => $available,
            'message' => 'Total leave: ' . $total . ' days, Used leave: ' . $used . ' days, Available leave: ' . $available . ' days',
        ], 200);

    }
}
