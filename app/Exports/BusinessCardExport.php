<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BusinessCardExport implements FromCollection,WithHeadings
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
        $query = DB::table('business_cards as bc')
            ->where('bc.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'bc.user_id', 'us.id')
            ->leftJoin('employees as em', 'bc.user_id', 'em.userid')
            ->select(
                 DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),'em.emp_id',
                'bc.no_of_cards', DB::raw("DATE_FORMAT(bc.`need_by_date`, '%d-%b-%Y') AS need_by_date"),
                DB::raw("CASE
                 WHEN bc.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN bc.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (bc.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (bc.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"));

        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('bc.user_id', $authUser->id);
        }elseif (is_numeric($this->user)){
            $query->where('bc.user_id', $this->user);
        }

        $results = $query->get();
       return $results;
    }
    public function headings(): array
    {
        return [
            'Name',
            'Employee ID',
            'Card Amount',
            'Need by date',
            'Status',
        ];
    }
}
