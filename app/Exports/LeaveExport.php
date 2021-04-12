<?php

namespace App\Exports;

use App\Http\Controllers\DummyDataController;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LeaveExport implements FromCollection,WithHeadings
{
    protected $user;

    function __construct($user) {
        $this->user = $user;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $authUser = auth()->user();
        $query = DB::table('leave_applications as la')
            ->where('la.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'la.user_id', 'us.id')
            ->leftJoin('employees as em', 'la.user_id', 'em.userid')
            ->leftJoin('leavepackages as lp', 'la.leave_type', 'lp.id')
            ->leftJoin('dropdown_items as di', 'la.reason', 'di.id')
            ->select(
                DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                'lp.type as leave_type', 'di.name as reason','em.emp_id','la.start_date',
                'la.end_date', 'la.status',

                DB::raw("CASE
                 WHEN la.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN la.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (la.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (la.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status")
            );

        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('user_id', $authUser->id);
        }elseif (is_numeric($this->user)){
            $query->where('user_id', $this->user);
        }

        $leaves = $query->get();
        return  $leaves;
    }
    public function headings(): array
    {
        return [
            'Name',
            'Leave Type',
            'Reason',
            'Employee ID',
            'Start Date',
            'End Date',
            'Status',
        ];
    }
}
