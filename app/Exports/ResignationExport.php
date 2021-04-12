<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ResignationExport implements FromCollection,WithHeadings
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
        $query = DB::table('resignation_applications as ra')
            ->where('ra.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'ra.user_id', 'us.id')
            ->leftJoin('employees as em', 'ra.user_id', 'em.userid')
            ->select(DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                'em.emp_id',  DB::raw("DATE_FORMAT(ra.`applicable_date`, '%d-%b-%Y') as applicable_date"),
                'ra.remarks',
                DB::raw("CASE
                 WHEN ra.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN ra.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (ra.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (ra.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status"));
        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('sr.user_id', $authUser->id);
        }elseif (is_numeric($this->user)){
            $query->where('sr.user_id', $this->user);
        }
        $results = $query->get();
       return $results;
    }
    public function headings(): array
    {
        return [
            'Name',
            'Employee ID',
            'Applicable Date',
            'Remarks',
            'Status',
        ];
    }
}
