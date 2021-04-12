<?php

namespace App\Http\Controllers\service;

use App\Http\Controllers\Controller;
use App\Models\BusinessCard;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Services\WorkFlowService;
use Illuminate\Http\Request;

class BusinessCardController extends Controller
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $authUser = Auth()->user();

        //Validate the request data
        $inputs = $request->all();
        $validator = Validator::make($inputs, [
            'card_amount' => 'required|integer|min:1',
            'remark' => 'nullable|string|max:512',
        ]);

        $card_amount = stripcslashes(strip_tags($inputs['card_amount']));
        $remark = stripcslashes(strip_tags($inputs['remark']));
        $need_by_date = stripcslashes(strip_tags($inputs['need_by_date']));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user_id = $authUser->id;
        if ($inputs['is_for_other']){
            $user_id = $inputs['request_for'];
        }
        $checkRequest = BusinessCard::where('company_id',$authUser->companyid)->where('user_id',$user_id)->whereIn('status',[0,-1])->count();
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

            $card_request = BusinessCard::create([
                'company_id' => $authUser->companyid,
                'user_id' => $user_id,
                'no_of_cards' => $card_amount,
                'need_by_date' => date('Y-m-d', strtotime($need_by_date)),
                'remarks' => $remark
            ]);
            $this->workFlow->setAction($request, $card_request['id']);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Business card request sent successfully';

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
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $req_id = (int)decryptId($id);
        $req_info = BusinessCard::select('no_of_cards as card_amount', 'remarks', 'need_by_date')
            ->where('id', $req_id)
            ->first();

        $response['req_info'] = [
            'card_amount' => $req_info->card_amount,
            'remarks' => $req_info->remarks,
            'need_by_date' => $req_info->need_by_date,
            'need_by_date_formatted' => date("j F, Y",strtotime($req_info->need_by_date)),

        ];
        return response()->json($response);
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

        $authUser = Auth()->user();

        //Validate the request data
        $inputs = $request->all();

        $validator = Validator::make($inputs, [
            'card_amount' => 'required|integer',
            'remark' => 'nullable|string|max:512',
        ]);

        $card_amount = stripcslashes(strip_tags($inputs['card_amount']));
        $remarks = stripcslashes(strip_tags($inputs['remark']));
        $need_by_date = stripcslashes(strip_tags($inputs['need_by_date']));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $card_request = BusinessCard::where('id', $req_id)->firstOrfail();
        if (!$card_request) {
            return response()->json(['message' => 'Data not found with given request ID'], 204);
        }

        try {
            DB::beginTransaction();

            /**
             * Update request data to the "business_card" table
             * ****************************************************/
            $card_request->no_of_cards = $card_amount;
            $card_request->need_by_date = date('Y-m-d', strtotime($need_by_date));
            $card_request->remarks = $remarks;
            $card_request->save();

            $this->workFlow->setAction($request, $req_id);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Business card request updated successfully';
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
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


}
