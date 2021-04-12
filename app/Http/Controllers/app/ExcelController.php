<?php

namespace App\Http\Controllers\app;

use App\Exports\BusinessCardExport;
use App\Exports\ResignationExport;
use App\Exports\IDCardExport;
use App\Exports\StationaryExport;
use App\Exports\LeaveExport;
use App\Exports\export\LoiExport;
use App\Exports\OvertimeExport;
use App\Exports\TransportExport;
use App\Http\Controllers\Controller;
use App\Models\IdCardRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;
use phpDocumentor\Reflection\Type;

class ExcelController extends Controller
{
    public function exportUser(Request $request)
    {
        return Excel::download(new UsersExport($request->id), "User-".date("Y-m-d h:i:sa").'.xlsx');
    }
    public function exportLoi(Request $request)
    {
        return Excel::download(new LoiExport($request->id), "LOI-".date("Y-m-d h:i:sa").'.xlsx');
    }
    public function exportLeave(Request $request)
    {
        return Excel::download(new LeaveExport($request->id), "Leave-".date("Y-m-d h:i:sa").'.xlsx');
    }
    public function exportResignation(Request $request)
    {
        return Excel::download(new ResignationExport($request->id), "Designation-".date("Y-m-d h:i:sa").'.xlsx');
    }
    public function exportStationary(Request $request)
    {
        return Excel::download(new StationaryExport($request->id), "Stationary-".date("Y-m-d h:i:sa").'.xlsx');
    }
    public function exportTransport(Request $request)
    {
        return Excel::download(new TransportExport($request->id), "Transport-".date("Y-m-d h:i:sa").'.xlsx');
    }
    public function exportOvertime(Request $request)
    {
        return Excel::download(new OvertimeExport($request->id), "Overtime-".date("Y-m-d h:i:sa").'.xlsx');
    }
    public function exportBusinessCard(Request $request)
    {
        return Excel::download(new BusinessCardExport($request->id), "Business Card-".date("Y-m-d h:i:sa").'.xlsx');
    }
    public function exportIDCard(Request $request)
    {
       /* if (is_numeric($request->id)){
            $target = IdCardRequest::find($request->id);
            if (!$target){
                return response()->json([
                    'message'=>"Not Found"
                ],404);
            }
        }*/
        return Excel::download(new IDCardExport($request->id), "ID Card-".date("Y-m-d h:i:sa").'.xlsx');
    }
}
