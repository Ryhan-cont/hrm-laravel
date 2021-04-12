<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class OvertimeExport implements FromCollection,WithHeadings
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
        //
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
