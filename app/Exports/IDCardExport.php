<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class IDCardExport implements FromCollection,WithHeadings
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
        $query = DB::table('id_card_requests as icr')
            ->where('icr.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'icr.user_id', 'us.id')
            ->leftJoin('dropdown_items as di', 'icr.reason', 'di.id')
            ->leftJoin('employees as em', 'icr.user_id', 'em.userid')
            ->select(
                DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                'em.emp_id','di.name as reason',
                'icr.remarks',
                DB::raw("CASE
                 WHEN icr.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN icr.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (icr.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (icr.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"));

        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('icr.user_id', $authUser->id);
        }elseif (is_numeric($this->user)){
            $query->where('icr.user_id', $this->user);
        }

        $card = $query->get();
       return $card;
    }
    public function headings(): array
    {
        return [
            'Name',
            'Employee ID',
            'Reason',
            'Remarks',
            'Status',
        ];
    }
}
