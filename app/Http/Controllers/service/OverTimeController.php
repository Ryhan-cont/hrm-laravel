<?php

namespace App\Http\Controllers\service;

use App\Http\Controllers\Controller;
use App\Models\OtSetting;
use App\Models\OvertimeApplication;
use App\Models\OvertimeApplicationItem;
use App\Services\WorkFlowService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OverTimeController extends Controller
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

    public function DayCheck($day)
    {
        $authUser = Auth()->user();
        $info = OtSetting::where('company_id', $authUser->companyid)->where('day_name', $day)->first('over_time');
        return response()->json(['max_over_time' => $info->over_time], 200);
    }

    public function otStore(Request $request)
    {
        $authUser = Auth()->user();
        $week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        foreach ($week as $w) {
            switch ($w) {
                case "Sunday":
                    $sun = [
                        'company_id' => $authUser->companyid,
                        'day_name' => $w,
                        'work_time' => $request->sun['w_h'],
                        'over_time' => $request->sun['o_h'],
                        'work_type' => $request->sun['w_type'],
                    ];

                    if ($request->sun['id']) {
                        OtSetting::where('id', $request->sun['id'])->update($sun);
                    } else {
                        OtSetting::create($sun);
                    }
                    break;
                case "Monday":
                    $mon = [
                        'company_id' => $authUser->companyid,
                        'day_name' => $w,
                        'work_time' => $request->mon['w_h'],
                        'over_time' => $request->mon['o_h'],
                        'work_type' => $request->mon['w_type'],
                    ];

                    if ($request->mon['id']) {
                        OtSetting::where('id', $request->mon['id'])->update($mon);
                    } else {
                        OtSetting::create($mon);
                    }
                    break;
                case "Tuesday":
                    $tue = [
                        'company_id' => $authUser->companyid,
                        'day_name' => $w,
                        'work_time' => $request->tue['w_h'],
                        'over_time' => $request->tue['o_h'],
                        'work_type' => $request->tue['w_type'],
                    ];

                    if ($request->tue['id']) {
                        OtSetting::where('id', $request->tue['id'])->update($tue);
                    } else {
                        OtSetting::create($tue);
                    }
                    break;
                case "Wednesday":
                    $wed = [
                        'company_id' => $authUser->companyid,
                        'day_name' => $w,
                        'work_time' => $request->wed['w_h'],
                        'over_time' => $request->wed['o_h'],
                        'work_type' => $request->wed['w_type'],
                    ];

                    if ($request->wed['id']) {
                        OtSetting::where('id', $request->wed['id'])->update($wed);
                    } else {
                        OtSetting::create($wed);
                    }
                    break;
                case "Thursday":
                    $thu = [
                        'company_id' => $authUser->companyid,
                        'day_name' => $w,
                        'work_time' => $request->thu['w_h'],
                        'over_time' => $request->thu['o_h'],
                        'work_type' => $request->thu['w_type'],
                    ];

                    if ($request->thu['id']) {
                        OtSetting::where('id', $request->thu['id'])->update($thu);
                    } else {
                        OtSetting::create($thu);
                    }
                    break;
                case "Friday":
                    $fri = [
                        'company_id' => $authUser->companyid,
                        'day_name' => $w,
                        'work_time' => $request->fri['w_h'],
                        'over_time' => $request->fri['o_h'],
                        'work_type' => $request->fri['w_type'],
                    ];

                    if ($request->fri['id']) {
                        OtSetting::where('id', $request->fri['id'])->update($fri);
                    } else {
                        OtSetting::create($fri);
                    }
                    break;
                case "Saturday":
                    $sat = [
                        'company_id' => $authUser->companyid,
                        'day_name' => $w,
                        'work_time' => $request->sat['w_h'],
                        'over_time' => $request->sat['o_h'],
                        'work_type' => $request->sat['w_type'],
                    ];

                    if ($request->sat['id']) {
                        OtSetting::where('id', $request->sat['id'])->update($sat);
                    } else {
                        OtSetting::create($sat);
                    }
                    break;
            }
        }
        return response()->json([
            'message' => 'Overtime setting saved'
        ], 200);
    }

    public function otData()
    {
        $authUser = Auth()->user();
        $data = OtSetting::where('company_id', $authUser->companyid)->get();
        $info = [];
        foreach ($data as $d) {
            if ($d->work_time == 0) {
                $wh = null;
            } else {
                $wh = $d->work_time;
            }

            if ($d->over_time == 0) {
                $oh = null;
            } else {
                $oh = $d->over_time;
            }

            switch ($d->day_name) {
                case "Sunday":
                    $sun = [
                        'id' => $d->id,
                        'w_h' => $wh,
                        'o_h' => $oh,
                        'w_type' => $d->work_type,
                    ];
                    $info['sun'] = $sun;
                    break;
                case "Monday":
                    $mon = [
                        'id' => $d->id,
                        'w_h' => $wh,
                        'o_h' => $oh,
                        'w_type' => $d->work_type,
                    ];
                    $info['mon'] = $mon;
                    break;
                case "Tuesday":
                    $tue = [
                        'id' => $d->id,
                        'w_h' => $wh,
                        'o_h' => $oh,
                        'w_type' => $d->work_type,
                    ];
                    $info['tue'] = $tue;
                    break;
                case "Wednesday":
                    $wed = [
                        'id' => $d->id,
                        'w_h' => $wh,
                        'o_h' => $oh,
                        'w_type' => $d->work_type,
                    ];
                    $info['wed'] = $wed;
                    break;
                case "Thursday":
                    $thu = [
                        'id' => $d->id,
                        'w_h' => $wh,
                        'o_h' => $oh,
                        'w_type' => $d->work_type,
                    ];
                    $info['thu'] = $thu;
                    break;
                case "Friday":
                    $fri = [
                        'id' => $d->id,
                        'w_h' => $wh,
                        'o_h' => $oh,
                        'w_type' => $d->work_type,
                    ];
                    $info['fri'] = $fri;
                    break;
                case "Saturday":
                    $sat = [
                        'id' => $d->id,
                        'w_h' => $wh,
                        'o_h' => $oh,
                        'w_type' => $d->work_type,
                    ];
                    $info['sat'] = $sat;
                    break;
            }
        }
        return response()->json(
            $info
            , 200);
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $authUser = Auth()->user();
        $user_id = $authUser->id;
        if ($request->is_for_other) {
            $user_id = $request->request_for;
        }
        $checkRequest = OvertimeApplication::where('company_id', $authUser->companyid)->where('user_id', $user_id)->whereIn('status', [0, -1])->count();
        if ($checkRequest > 0 && CONST_REQUEST_PROHIBIT) {
            return response()->json([
                'message' => 'Already a requested is in process',
            ], 406);
        }
        try {
            DB::beginTransaction();


            $overtime = OvertimeApplication::create([
                'company_id' => $authUser->companyid,
                'user_id' => $user_id,
                'remarks' => $request->remarks,
            ]);

            foreach ($request->overTime as $in) {
                OvertimeApplicationItem::create([
                    'overtime_application_id' => $overtime->id,
                    'type_id' => $in['type'],
                    'date' => date('Y-m-d', strtotime($in['date'])),
                    'start_time' => date('H:i:s', strtotime($in['start'])),
                    'end_time' => date('H:i:s', strtotime($in['end'])),
                ]);
            }
            $this->workFlow->setAction($request, $overtime->id);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Overtime request sent successfully';

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

        $target = OvertimeApplication::find($req_id);
        $items = DB::table('overtime_application_items as oa')
            ->leftJoin('dropdown_items as dd1', 'oa.type_id', 'dd1.id')
            ->where('oa.overtime_application_id', $req_id)
            ->select('dd1.id as type_id', 'dd1.name as type_name', 'oa.date', 'oa.start_time', 'oa.end_time', 'oa.id as item_id')
            ->get();
        $info = [];

        foreach ($items as $item) {
            $to = Carbon::createFromDate($item->start_time);
            $from = Carbon::createFromDate($item->end_time);
            $diff_in_hours = $to->diffInMinutes($from);
            array_push($info, [
                'type_id' => $item->type_id,
                'type_name' => $item->type_name,
                'formatted_date' => date_format(date_create($item->date), 'jS F Y'),
                'date' => $item->date,
                'formatted_start_time' => date_format(date_create($item->start_time), 'g:ia'),
                'formatted_end_time' => date_format(date_create($item->end_time), 'g:ia'),
                'start_time' => date_create($item->start_time),
                'end_time' => date_create($item->end_time),
                'item_id' => $item->item_id,
                'diff' => number_format($diff_in_hours/60,2),
                'max_over_time' => $this->DayCheck(date_format(date_create($item->date), 'l'))->original['max_over_time'],
                /* 'date' => date_format(date_create($item->date), 'g:ia \o\n l jS F Y'),*/
            ]);
        }

        return response()->json([
            'infos' => $info,
            'overtime_id' => $target->id,
            'remarks' => $target->remarks,
        ]);
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
    public function update(Request $request, $id)
    {
        $req_id = (int)decryptId($id);


        try {
            DB::beginTransaction();

            /**
             * Insert request data to the "id_card_requests" table
             * ****************************************************/
            OvertimeApplication::where('id', $request->overtime_id)->update([
                'remarks' => $request->remarks,
            ]);

            $info = [];
            foreach ($request->overTime as $st) {
                $info['type_id'] = $st['type_id'];
                $info['date'] = date('Y-m-d', strtotime($st['date']));
                $info['start_time'] = date('H:i:s', strtotime($st['start_time']['date']));
                $info['end_time'] = date('H:i:s', strtotime($st['end_time']['date']));
                if (isset($st['item_id'])) {
                    OvertimeApplicationItem::where('id', $st['item_id'])->update($info);
                } else {
                    $info['overtime_application_id'] = $request->overtime_id;
                    OvertimeApplicationItem::create($info);
                }
            }
            if ($request->delete_ids) {
                OvertimeApplicationItem::destroy($request->delete_ids);
            }
            $this->workFlow->setAction($request, $req_id);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Overtime Application update successfully';

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
