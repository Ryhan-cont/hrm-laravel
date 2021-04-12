<?php

namespace App\Models;

use App\Http\Traits\ActivityTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class WfActionLog extends Model
{
    use HasFactory, LogsActivity, ActivityTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'wf_process_id', 'wf_process_def_id', 'ref_id', 'req_id', 'status', 'action_by', 'actual_requester', 'pending_to',
        'work_group_id', 'remarks', 'official_create_time'
    ];

    public static function boot()
    {
        parent::boot();

        //WfActionLog::observe(new \App\Observers\ServiceRequestObserver);
        WfActionLog::observe(new \App\Services\WorkFlowService);

        //static::addGlobalScope(new AgentScope);
    }

    /**
     * Activity log
     * $logName is the table name
     */
    protected static $logName = 'wf_action_logs';
    protected static $logAttributes = ['*'];
    protected static $logAttributesToIgnore = ['id', 'created_at', 'updated_at'];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;
}
