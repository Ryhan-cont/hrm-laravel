<?php

namespace App\Http\Controllers\service;

use App\Http\Controllers\Controller;
use App\Models\TransportRequisition;
use App\Services\WorkFlowService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransportRequisitionController extends Controller
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

    public function data($id)
    {
        $req_id = (int)decryptId($id);

        $info = DB::table('transport_requisitions as tr')
            ->leftJoin('dropdown_items as dd', 'tr.transport_type_id', 'dd.id')
            ->select('tr.*', 'dd.name as transport','dd.id as transport_selected_id')
            ->where('tr.id', $req_id)
            ->first();

        $data = [
          'transport' => $info->transport,
            'transport_id' => $info->id,
            'transport_selected_id' => $info->transport_selected_id,
          'location_from' => $info->location_from,
          'location_to' => $info->location_to,
          'start_date' =>Carbon::createFromDate($info->start_date),
          'end_date' =>Carbon::createFromDate($info->end_date),
          'formatted_start_datetime'  => date_format(date_create($info->start_date), 'g:ia \o\n jS F Y'),
          'formatted_end_datetime'  => date_format(date_create($info->end_date), 'g:ia \o\n jS F Y'),
          'remarks'=> $info->remarks,
        ];
       return response()->json(['infos'=>$data],200);
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

        $user_id = $authUser->id;
        if ($request->is_for_other){
            $user_id = $request->request_for;
        }
        $checkRequest = TransportRequisition::where('company_id',$authUser->companyid)->where('user_id',$user_id)->whereIn('status',[0,-1])->count();
        if ($checkRequest > 0 && CONST_REQUEST_PROHIBIT){
            return response()->json([
                'message' => 'Already a requested is in process',
            ], 406);
        }
        try {
            DB::beginTransaction();

            $results = TransportRequisition::create([
                'company_id' => $authUser->companyid,
                'user_id' => $user_id,
                'transport_type_id' => $inputs['transport'],
                'location_to' => $inputs['location_to'],
                'location_from' => $inputs['location_from'],
                'start_date' => Carbon::createFromDate($inputs['datetime']['start']),
                'end_date' => Carbon::createFromDate($inputs['datetime']['end']),
                'remarks' => $inputs['remarks']
            ]);

            $this->workFlow->setAction($request, $results->id);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Transport requisition request created successfully';

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
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {


        try {
            DB::beginTransaction();


            $authUser = Auth()->user();
            //Validate the request data
            $inputs = $request->all();
            $results = TransportRequisition::where('id',$inputs['trans_id'])->update([
                'transport_type_id' => $inputs['transport'],
                'location_to' => $inputs['location_to'],
                'location_from' => $inputs['location_from'],
                'start_date' => Carbon::createFromDate($inputs['dateRange']['start']),
                'end_date' => Carbon::createFromDate($inputs['dateRange']['end']),
                'remarks' => $inputs['remarks']
            ]);

            $this->workFlow->setAction($request, $inputs['trans_id']);
            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Transport requisition request updated successfully';

            return response()->json($response, 200);
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
}
