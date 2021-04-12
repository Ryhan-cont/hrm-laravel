<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Http\Traits\ActivityTrait;

class Emailtemplate extends Model
{
    use HasFactory, LogsActivity, ActivityTrait;

    /**
     * Activity log
     * $logName is the table name
     */
    protected static $logName = 'emailtemplates';
    protected static $logAttributes = ['*'];
    protected static $logAttributesToIgnore = ['id', 'created_at', 'updated_at'];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;
}
