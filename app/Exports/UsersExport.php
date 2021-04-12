<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection,WithHeadings
{
    protected $type;

    function __construct($type) {
        $this->type = $type;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {

        $auth_user = auth()->user();
        $query = DB::table('users as u')
             -> leftJoin('roles as r', 'u.roleid', '=', 'r.id')
            ->leftJoin('employees as e', 'u.id', '=', 'e.userid')
            ->leftJoin('companies as c', 'u.companyid', '=', 'c.id')
            ->leftJoin('dropdown_items as dd', 'e.designation', '=', 'dd.id')
            ->select(
                DB::raw("TRIM(CONCAT(u.first_name,' ',IFNULL(u.last_name, ''))) as full_name"),
                'u.email', 'r.name as role_name', 'e.emp_id', 'dd.name as designation', 'c.name as company_name',
                DB::raw("CASE
                 WHEN u.is_active = 0 THEN 'Inactive'
                WHEN u.is_active = 1 THEN 'Active'
                 END as status"))
            ->where('u.companyid', '=', $auth_user->companyid);
        if ( $this->type == 1){
            $query->where('u.is_active',1);
        }elseif ($this->type == 0){
            $query->where('u.is_active',0);
        }
        $results = $query->get();
        return $results;
    }
    public function headings(): array
    {
        return [
            'Name',
            'Email',
            'Employee Type',
            'Employee ID',
            'Designation',
            'Company Name',
            'Status',
        ];
    }
}
