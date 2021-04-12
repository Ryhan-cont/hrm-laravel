<?php

namespace App\Models;

use App\Http\Traits\ActivityTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class LeaveApplication extends Model
{
    use HasFactory, LogsActivity, ActivityTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = ['company_id', 'user_id', 'leave_type', 'reason', 'start_date', 'end_date', 'remarks', 'status'];

    /**
     * Activity log
     * $logName is the table name
     */
    protected static $logName = 'leave_applications';
    protected static $logAttributes = ['*'];
    protected static $logAttributesToIgnore = ['id', 'created_at', 'updated_at'];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;
}
