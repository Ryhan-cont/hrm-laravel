<?php

namespace App\Models;

use App\Http\Traits\ActivityTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;

class Address extends Model
{
    use HasFactory, LogsActivity, ActivityTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = ['user_id', 'address_type', 'address_line_1', 'address_line_2', 'post_code', 'city_id', 'province_id', 'country_id'];

    /**
     * Activity log
     * $logName is the table name
     */
    protected static $logName = 'addresses';
    protected static $logAttributes = ['*'];
    protected static $logAttributesToIgnore = ['id', 'created_at', 'updated_at'];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;
}
