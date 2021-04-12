<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Spatie\Activitylog\Contracts\Activity;

trait ActivityTrait {
    public function tapActivity(Activity $activity)
    {
        //$activity->company_id = auth()->user()->companyid;

        $activity->company_id =  (isset(auth()->user()->companyid)) ?  auth()->user()->companyid:null;
        $activity->ip = request()->ip();
    }

}
