<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class StationaryExport implements FromCollection,WithHeadings
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
        $query = DB::table('stationary_requisitions as sr')
            ->where('sr.company_id', $authUser->companyid)
            ->leftJoin('users as us', 'sr.user_id', 'us.id')
            ->leftJoin('employees as em', 'sr.user_id', 'em.userid')
            ->leftJoin('stationary_requisition_items as sri', 'sr.id', 'sri.stationary_requisition_id')
            ->leftJoin('dropdown_items as dic', 'sri.category_id', 'dic.id')
            ->leftJoin('dropdown_items as dis', 'sri.subcategory_id', 'dis.id')
            ->leftJoin('dropdown_items as dii', 'sri.item', 'dii.id')
            ->select(
                DB::raw("CONCAT(us.first_name,' ',IFNULL(us.last_name, '')) AS full_name"),
                'em.emp_id', 'dic.name as category','dis.name as sub_category','dii.name as item', 'sri.quantity',
                DB::raw("DATE_FORMAT(sr.`need_by_date`, '%d-%b-%Y') as need_by_date"),
                DB::raw("CASE
                 WHEN sr.status =" . CONST_APPLICATION_DONE . " THEN 'Accepted'
                 WHEN sr.status =" . CONST_APPLICATION_CANCEL . " THEN 'Cancel'
                 WHEN (sr.status =" . CONST_APPLICATION_ON_PROCESS . ") THEN 'On Process'
                 WHEN (sr.status =" . CONST_APPLICATION_REJECT . ") THEN 'Reject'
                 END as status")
            );


        if ($authUser->roleid > CONST_ROLE_COMPANY_ADMIN) {
            $query->where('sr.user_id', $authUser->id);
        }elseif (is_numeric($this->user)){
            $query->where('sr.user_id', $this->user);
        }
        $results = $query->get();
       return  $results;
    }
    public function headings(): array
    {
        return [
            'Name',
            'Employee ID',
            'Category',
            'Sub Category',
            'Item',
            'QTY',
            'Need by Date',
            'Status',
        ];
    }
}
