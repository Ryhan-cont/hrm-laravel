<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TransportExport implements FromCollection,WithHeadings
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
        $query = DB::table('transport_requisitions as tr')
            ->where('tr.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'tr.user_id', 'us.id')
            ->leftJoin('employees as em', 'tr.user_id', 'em.userid')
            ->leftJoin('dropdown_items as di', 'tr.transport_type_id', 'di.id')
            ->select( DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                'em.emp_id', 'di.name as transport_type',
                DB::raw("DATE_FORMAT(tr.`start_date`, '%e-%b-%Y %l:%i %p') as start_date"),
                DB::raw("DATE_FORMAT(tr.`end_date`, '%e-%b-%Y %l:%i %p') as end_date"),
                'tr.location_from', 'tr.location_to',
                DB::raw("CASE
                 WHEN tr.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN tr.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (tr.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (tr.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status")
            );
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('tr.user_id', $authUser->id);
        }elseif (is_numeric($this->user)){
            $query->where('tr.user_id', $this->user);
        }

        $trans = $query->get();
        return  $trans;
    }
    public function headings(): array
    {
        return [
            'Name',
            'Employee ID',
            'Transport Type',
            'Start Date',
            'End Date',
            'From',
            'To',
            'Status',
        ];
    }
}
