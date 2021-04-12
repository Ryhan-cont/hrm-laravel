<?php

namespace App\Http\Controllers\service;

use App\Http\Controllers\Controller;
use App\Models\IdCardRequest;
use Illuminate\Http\Request;
use App\Services\WorkFlowService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class IdCardReqController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $authUser = Auth()->user();

        //Validate the request data
        $inputs = $request->all();
        $validator = Validator::make($inputs, [
            'reason' => 'required|integer',
            'remarks' => 'nullable|string|max:512',
        ]);

        $reason = stripcslashes(strip_tags($inputs['reason']));
        $remarks = stripcslashes(strip_tags($inputs['remarks']));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user_id = $authUser->id;
        if ($inputs['is_for_other']){
            $user_id = $inputs['request_for'];
        }

       $checkRequest = IdCardRequest::where('company_id',$authUser->companyid)->where('user_id',$user_id)->whereIn('status',[0,-1])->count();
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

            $card_request = IdCardRequest::create([
                'company_id' => $authUser->companyid,
                'user_id' => $user_id,
                'reason' => $reason,
                'remarks' => $remarks
            ]);

            $this->workFlow->setAction($request, $card_request['id']);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'ID Card request sent successfully';
            return response()->json($response);
        } catch (Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();

            return response()->json($response, 500);
        }
    }

    /**
     * Display the resource of the request.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        $req_id = (int) decryptId($id);
        $req_info = DB::table('id_card_requests as r')
            ->join('dropdown_items as dd', 'dd.id', '=', 'r.reason')
            ->select('r.reason as reason_id','dd.name as reason', 'r.remarks')
            ->where('r.id', $req_id)
            ->first();
        $response['req_info'] = $req_info;
        return response()->json($response);
    }


    /**
     * Update a previously created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param $id string Request ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        $req_id = decryptId($id);

        $authUser = Auth()->user();

        //Validate the request data
        $inputs = $request->all();
        $validator = Validator::make($inputs, [
            'reason' => 'required|integer',
            'remarks' => 'nullable|string|max:512',
        ]);

        $reason = stripcslashes(strip_tags($inputs['reason']));
        $remarks = stripcslashes(strip_tags($inputs['remarks']));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $card_request = IdCardRequest::where('id', $req_id)->firstOrfail();
        if (!$card_request) {
            return response()->json(['message' => 'Data not found with given request ID'], 204);
        }

        try {
            DB::beginTransaction();

            /**
             * Update request data to the "id_card_requests" table
             * ****************************************************/
            $card_request->reason = $request->reason;
            $card_request->remarks = $request->remarks;
            $card_request->save();

            $this->workFlow->setAction($request, $req_id);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'ID Card request updated successfully';
            return response()->json($response);
        } catch (Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();

            return response()->json($response, 500);
        }
    }
}
