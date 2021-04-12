<?php

namespace App\Http\Controllers\service;

use App\Http\Controllers\Controller;
use App\Models\BusinessCard;
use App\Models\ResignationApplication;
use App\Services\WorkFlowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ResignationApplicationController extends Controller
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
            'remark' => 'nullable|string|max:512',
        ]);

        $remark = stripcslashes(strip_tags($inputs['remark']));
        $applicable_date = stripcslashes(strip_tags($inputs['applicable_date']));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $checkRequest = ResignationApplication::where('company_id',$authUser->companyid)->where('user_id',$authUser->id)->whereIn('status',[0,-1])->count();
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

            $resignation_request = ResignationApplication::create([
                'company_id' => $authUser->companyid,
                'user_id' => $authUser->id,
                'applicable_date' => date('Y-m-d', strtotime($applicable_date)),
                'remarks' => $remark
            ]);
            $this->workFlow->setAction($request, $resignation_request['id']);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Resignation request sent successfully';

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();

            return response()->json($response, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $req_id = (int)decryptId($id);
        $req_info = ResignationApplication::find($req_id);
        $response['req_info'] = $req_info;
        return response()->json($response);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $req_id = decryptId($id);

        $authUser = Auth()->user();

        //Validate the request data
        $inputs = $request->all();

        $validator = Validator::make($inputs, [
            'remarks' => 'nullable|string|max:512',
        ]);

        $remarks = stripcslashes(strip_tags($inputs['remarks']));
        $applicable_date = stripcslashes(strip_tags($inputs['applicable_date']));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $card_request = ResignationApplication::where('id', $req_id)->firstOrfail();
        if (!$card_request) {
            return response()->json(['message' => 'Data not found with given request ID'], 204);
        }

        try {
            DB::beginTransaction();

            /**
             * Update request data to the "business_card" table
             * ****************************************************/

            $card_request->applicable_date = date('Y-m-d', strtotime($applicable_date));
            $card_request->remarks = $remarks;
            $card_request->save();

            $this->workFlow->setAction($request, $req_id);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Resignation request updated successfully';
            return response()->json($response);
        } catch (Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();

            return response()->json($response, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
