<?php

namespace App\Http\Controllers\service;

use App\Http\Controllers\Controller;
use App\Models\Loiorganization;
use App\Models\LoiService;
use App\Models\Payrollpackage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Services\WorkFlowService;


class LoiServiceController extends Controller
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
            'org_id' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user_id = $authUser->id;
        if ($inputs['is_for_other']){
            $user_id = $inputs['request_for'];
        }
        $checkRequest = LoiService::where('company_id',$authUser->companyid)->where('user_id',$user_id)->whereIn('status',[0,-1])->count();
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
            $card_request = LoiService::create([
                'company_id' => $authUser->companyid,
                'user_id' => $user_id,
                'org_id' => $inputs['org_id'],
                'show_salary' => $inputs['view_salary'],
                'start_date' => date('Y-m-d', strtotime($inputs['start_date'])),
                'end_date' => date('Y-m-d', strtotime($inputs['end_date'])),
                'remarks' => $inputs['remarks'],
            ]);


            $this->workFlow->setAction($request, $card_request['id']);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Business card request sent successfully';

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
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $req_id = (int)decryptId($id);
        $req_info= DB::table('loi_services as loi')
             ->leftJoin('loiorganizations as org','loi.org_id','org.id')
             ->leftJoin('dropdown_items as di','org.type','di.id')
             ->select('di.name as org_type','org.name as org_name',
                 'loi.user_id','loi.remarks','loi.show_salary','org.id as org_name_id',
                 'loi.start_date','loi.end_date','org.type as org_type_id',
                 DB::raw("DATE_FORMAT(loi.start_date, '%d-%b-%Y') as form_start_date"),
                 DB::raw("DATE_FORMAT(loi.end_date, '%d-%b-%Y') as form_end_date"),
                 'org.address','org.letter_to as letter_to')
             ->where('loi.id', $req_id)
             ->first();
        //Show salary
        $salary=null;
        if ($req_info->show_salary){
            $salary = DB::table('employees as em')
                    ->leftJoin('payrollpackages as pp','em.payrollpackage','pp.sourceid')
                    ->where('em.userid',$req_info->user_id)
                     ->get()->SUM('amount');
        }

        //Duration calculation form two dates
        $to = Carbon::createFromFormat('Y-m-d', $req_info->start_date);
        $from = Carbon::createFromFormat('Y-m-d', $req_info->end_date);
        $duration= $to->diffInDays($from);

      //  $req_info['durations'] = $duration;
        return response()->json([
            'infos' => $req_info,
            'durations' => $duration +1,
            'salary' => $salary,
        ]);
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
    public function update(Request $request, string $id)
    {
        $req_id = decryptId($id);
        $inputs = $request->all();
        $validator = Validator::make($inputs, [
            'org_id' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $org_id = stripcslashes(strip_tags($inputs['org_id']));
        $view_salary = stripcslashes(strip_tags($inputs['view_salary']));
        $start_date = stripcslashes(strip_tags($inputs['start_date']));
        $end_date = stripcslashes(strip_tags($inputs['end_date']));
        $remark = stripcslashes(strip_tags($inputs['remarks']));


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $loi_service = LoiService::where('id', $req_id)->firstOrfail();
        if (!$loi_service) {
            return response()->json(['message' => 'Data not found with given request ID'], 204);
        }

        try {
            DB::beginTransaction();

            /**
             * Update request data to the "business_card" table
             * ****************************************************/
            $loi_service->org_id = $org_id;
            $loi_service->show_salary = (int)$view_salary;
            $loi_service->start_date = date('Y-m-d', strtotime($start_date));
            $loi_service->end_date = date('Y-m-d', strtotime($end_date));
            $loi_service->remarks = $remark;
            $loi_service->save();

            $this->workFlow->setAction($request, $req_id);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'LOI service updated successfully';
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function orgName($id){

        $org_names = Loiorganization::where('type',$id)->select('id as value','name as label')->get();
       return response()->json([
           'items' => $org_names
       ],200);
    }
    public function orgAddress($id){

        $org = Loiorganization::find($id);
       return response()->json([
           'address' => $org->address,
           'letter_to' => $org->letter_to
       ],200);
    }
}
