<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Http\Traits\ActivityTrait;

class Module extends Model
{
    use HasFactory, LogsActivity, ActivityTrait;

    protected $attributes = [

    ];
    protected $fillable = [

    ];
    protected $casts = [
        'subpermissions' => 'array'
    ];

    /**
     * Activity log
     * $logName is the table name
     */
    protected static $logName = 'modules';
    protected static $logAttributes = ['*'];
    protected static $logAttributesToIgnore = ['id', 'created_at', 'updated_at'];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;

}
