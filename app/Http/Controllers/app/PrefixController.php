<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Prefix;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class PrefixController extends Controller
{
    public function create(Request $request){
        $input = $request->all();
        
        $validator = Validator::make($input, [
            'type' => 'required|max:64',
            'name' => 'required|max:255',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }
        
        $authUser = Auth::user();

        $prefix = new Prefix;
        foreach($input as $k => $v){
            $prefix->$k = $v;
        }

        $prefix->companyid = $authUser->companyid;

        $register = $prefix->save();
        return response()->json([$register,'message'=>'Organization prefix created successfully'], 200);
    }

    public function update(Request $request){
        $input = $request->all();
        
        $validator = Validator::make($input, [
            'type' => 'required|max:64',
            'name' => 'required|max:255',
            'id' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }
        
        $authUser = Auth::user();
        $prefixData = Prefix::where('id', $input['id'])->first();

        if($prefixData->companyid != $authUser->companyid){
            return response()->json(['message' => 'Invalid request (unauthorized)'],403);
        }

        $prefix = array();
        foreach($input as $k => $v){
            $prefix[$k] = $v;
        }

        $register = Prefix::where('id', $input['id'])->update($prefix);

        return response()->json([$register,'message'=>'Organization prefix updated successfully'], 200);
    }
    public function delete(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }
        $authUser = Auth::user();
        $prefixData = Prefix::where('id', $input['id'])->first();

        if($prefixData->companyid != $authUser->companyid){
            return response()->json(['error' => 'Invalid request (unauthorized)'],403);
        }
        
        $delete = Prefix::where('id', $input['id'])->delete();

        return response()->json([$delete,'message'=>'Organization prefix deleted successfully'], 200);
    }
}
