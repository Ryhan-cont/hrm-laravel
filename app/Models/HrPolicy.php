<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HrPolicy extends Model
{
    use HasFactory;
    protected $guarded = [];

    /**
     * Activity log
     * $logName is the table name
     */
    protected static $logName = 'hr-policy';
    protected static $logAttributes = ['*'];
    protected static $logAttributesToIgnore = ['id', 'created_at', 'updated_at'];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;
}
