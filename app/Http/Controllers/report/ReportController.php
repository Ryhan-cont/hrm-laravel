<?php

namespace App\Http\Controllers\report;

use App\Http\Controllers\Controller;
use App\Models\BusinessCard;
use App\Models\IdCardRequest;
use App\Models\LeaveApplication;
use App\Models\LoiService;
use App\Models\OvertimeApplication;
use App\Models\ResignationApplication;
use App\Models\StationaryRequisition;
use App\Models\StationaryRequisitionItem;
use App\Models\TransportRequisition;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function Symfony\Component\Translation\t;

class ReportController extends Controller
{
    public function leaveReport(Request $request)
    {
        $authUser = auth()->user();
        $isAdmin = true;
        $query = DB::table('leave_applications as la')
            ->where('la.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'la.user_id', 'us.id')
            ->leftJoin('leavepackages as lp', 'la.leave_type', 'lp.id')
            ->leftJoin('dropdown_items as di', 'la.reason', 'di.id')
            ->select('lp.type as leave_type', 'di.name as reason', 'la.start_date',
                'la.end_date', 'la.user_id', 'la.status', 'us.first_name', 'us.last_name');
        if ($request->target != "all") {
            $query->where('user_id', $request->target);
        }
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
            $isAdmin = false;
        }

        $leaves = $query->get();
        $info = [];

        foreach ($leaves as $leave) {
            $count = 0;
            $to = Carbon::createFromFormat('Y-m-d', $leave->start_date);
            $from = Carbon::createFromFormat('Y-m-d', $leave->end_date);
            $diff_in_days = $to->diffInDays($from);
            $count = $count + $diff_in_days + 1;
            $status = '';
            switch ($leave->status) {
                case CONST_APPLICATION_DONE:
                    $status = "Accepted";
                    break;
                case CONST_APPLICATION_CANCEL:
                    $status = "Canceled";
                    break;
                case CONST_APPLICATION_REJECT:
                    $status = "Rejected";
                    break;
                case CONST_APPLICATION_ON_PROCESS:
                    $status = "On Process";
                    break;
                default:
                    $status = "";
            }
            $info[] = [
                'leave_type' => $leave->leave_type,
                'reason' => $leave->reason,
                'date_range' => date_format(date_create($leave->start_date), 'jS F Y') . ' - ' . date_format(date_create($leave->end_date), 'jS F Y'),
                'status' => $status,
                'full_name' => $leave->first_name . ' ' . $leave->last_name,
                'user_id' => $leave->user_id,
                'total_days' => $count,
            ];
        }


        return response()->json([
            'leave_data' => $info,
            'isAdmin' => $isAdmin,
        ], 200);
    }

    public function OTReport(Request $request)
    {
        $authUser = auth()->user();
        $isAdmin = true;
        $query = DB::table('overtime_applications as oa')
            ->where('oa.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'oa.user_id', 'us.id')
            ->leftJoin('overtime_application_items as oai', 'oa.id', 'oai.overtime_application_id')
            ->leftJoin('dropdown_items as di', 'oai.type_id', 'di.id')
            ->select('di.name as type', 'oai.date', 'oai.start_time', 'oai.end_time',
                'oa.user_id', 'us.first_name', 'us.last_name', 'oa.status');

        if ($request->target != "all") {
            $query->where('user_id', $request->target);
        }
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
            $isAdmin = false;
        }

        $overtimes = $query->get();
        $info = [];
        $count = 0;
        foreach ($overtimes as $overtime) {
            $tz = $request->get('timezone');
            $to = Carbon::createFromTimeString($overtime->start_time, $tz);
            $from = Carbon::createFromTimeString($overtime->end_time, $tz);
            $diff_in_mins = $to->diffInMinutes($from);

            $hour = (int)($diff_in_mins / 60);
            $min = $diff_in_mins - ($hour * 60);

            $status = '';
            switch ($overtime->status) {
                case CONST_APPLICATION_DONE:
                    $status = "Accepted";
                    break;
                case CONST_APPLICATION_CANCEL:
                    $status = "Canceled";
                    break;
                case CONST_APPLICATION_REJECT:
                    $status = "Rejected";
                    break;
                case CONST_APPLICATION_ON_PROCESS:
                    $status = "On Process";
                    break;
                default:
                    $status = "";
            }
            $info[] = [
                'leave_type' => $overtime->type,
                'date' => date_format(date_create($overtime->date), 'jS F Y'),
                'time_range' => date_format(date_create($overtime->start_time), 'g:ia') . ' - ' . date_format(date_create($overtime->end_time), 'g:ia'),
                'status' => $status,
                'full_name' => $overtime->first_name . ' ' . $overtime->last_name,
                'user_id' => $overtime->user_id,
                'total_hour' => $hour . ' Hours, ' . $min . ' Minutes',
            ];
        }


        return response()->json([
            'leave_data' => $info,
            'isAdmin' => $isAdmin,
        ], 200);
    }

    public function BusinessCardReport(Request $request)
    {
        $authUser = auth()->user();
        $isAdmin = true;
        $query = DB::table('business_cards as bc')
            ->where('bc.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'bc.user_id', 'us.id')
            ->select('bc.no_of_cards', DB::raw("DATE_FORMAT(bc.`need_by_date`, '%d-%b-%Y') AS need_by_date"),
                'bc.user_id', DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"), 'bc.status',
                DB::raw("CASE
                 WHEN bc.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN bc.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (bc.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (bc.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"));

        if ($request->target != "all") {
            $query->where('user_id', $request->target);
        }
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
            $isAdmin = false;
        }
        $Cards = $query->get();
        return response()->json([
            'b_card_data' => $Cards,
            'isAdmin' => $isAdmin,
        ], 200);
    }

    public function IDCardReport(Request $request)
    {
        $authUser = auth()->user();
        $isAdmin = true;
        $query = DB::table('id_card_requests as icr')
            ->where('icr.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'icr.user_id', 'us.id')
            ->leftJoin('dropdown_items as di', 'icr.reason', 'di.id')
            ->select('di.name as reason', 'icr.user_id',
                DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                DB::raw("CASE
                 WHEN icr.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN icr.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (icr.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (icr.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"), DB::raw("CONCAT(LEFT(remarks , 30),'...') as remarks"));
        if ($request->target != "all") {
            $query->where('user_id', $request->target);
        }
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
            $isAdmin = false;
        }
        $Cards = $query->get();
        return response()->json([
            'idcard_data' => $Cards,
            'isAdmin' => $isAdmin,
        ], 200);
    }

    public function LoiReport(Request $request)
    {
        $authUser = auth()->user();
        $isAdmin = true;
        $query = DB::table('loi_services as loi')
            ->where('loi.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'loi.user_id', 'us.id')
            ->leftJoin('loiorganizations as lo', 'loi.org_id', 'lo.id')
            ->leftJoin('dropdown_items as di', 'lo.type', 'di.id')
            ->select(DB::raw("CONCAT(DATE_FORMAT(loi.`start_date`, '%d-%b-%Y'),' - ',DATE_FORMAT(loi.`end_date`, '%d-%b-%Y')) AS date_range"),
                'loi.user_id', DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                DB::raw("CASE
                 WHEN loi.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN loi.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (loi.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (loi.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"), 'di.name as type', 'lo.name as org_name', 'lo.address', 'lo.letter_to');

        if ($request->target != "all") {
            $query->where('user_id', $request->target);
        }
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
            $isAdmin = false;
        }
        $Cards = $query->get();
        return response()->json([
            'loi_data' => $Cards,
            'isAdmin' => $isAdmin,
        ], 200);
    }

    public function ResignationReport(Request $request)
    {
        $authUser = auth()->user();
        $isAdmin = true;
        $query = DB::table('resignation_applications as ra')
            ->where('ra.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'ra.user_id', 'us.id')
            ->select('ra.user_id', DB::raw("DATE_FORMAT(ra.`applicable_date`, '%d-%b-%Y') as applicable_date"),
                DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                DB::raw("CASE
                 WHEN ra.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN ra.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (ra.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (ra.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"), DB::raw("CONCAT(LEFT(remarks , 50),'...') as remarks"));
        if ($request->target != "all") {
            $query->where('user_id', $request->target);
        }
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
            $isAdmin = false;
        }
        $resignation = $query->get();
        return response()->json([
            'resignations_data' => $resignation,
            'isAdmin' => $isAdmin,
        ], 200);
    }

    public function TransportReport(Request $request)
    {


        $authUser = auth()->user();
        $isAdmin = true;
        $query = DB::table('transport_requisitions as tr')
            ->where('tr.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'tr.user_id', 'us.id')
            ->leftJoin('dropdown_items as di', 'tr.transport_type_id', 'di.id')
            ->select('tr.user_id', DB::raw("CONCAT(DATE_FORMAT(tr.`start_date`, '%b %e, %Y, %l:%i %p'),' - ',DATE_FORMAT(tr.`end_date`, '%b %e, %Y, %l:%i %p')) as date_range"),
                DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                DB::raw("CASE
                 WHEN tr.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN tr.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (tr.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (tr.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"),
                'di.name as transport_type', 'tr.location_from', 'tr.location_to'
            );
        if ($request->target != "all") {
            $query->where('user_id', $request->target);
        }
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
            $isAdmin = false;
        }
        $results = $query->get();
        return response()->json([
            'transport_data' => $results,
            'isAdmin' => $isAdmin,
        ], 200);
    }

    public function StationaryReport(Request $request)
    {

        $authUser = auth()->user();
        $isAdmin = true;
        $query = DB::table('stationary_requisitions as sr')
            ->where('sr.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'sr.user_id', 'us.id')
            ->leftJoin('stationary_requisition_items as sri', 'sr.id', 'sri.stationary_requisition_id')
            ->leftJoin('dropdown_items as dic', 'sri.category_id', 'dic.id')
            ->leftJoin('dropdown_items as dis', 'sri.subcategory_id', 'dis.id')
            ->leftJoin('dropdown_items as dii', 'sri.item', 'dii.id')
            ->select('dii.name as item', 'dis.name as sub_category', 'dic.name as category',
                DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                DB::raw("CASE
                 WHEN sr.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN sr.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (sr.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (sr.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"),
                DB::raw("DATE_FORMAT(sr.`need_by_date`, '%d-%b-%Y') as need_by_date"),
                'sri.quantity'
            );


        if ($request->target != "all") {
            $query->where('user_id', $request->target);
        }
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
            $isAdmin = false;
        }
        $results = $query->get();
        return response()->json([
            'stationary_data' => $results,
            'isAdmin' => $isAdmin,
        ], 200);
    }
}
