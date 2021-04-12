<?php

namespace App\Http\Controllers\app\masterdata;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Emailtemplate;
use App\Models\Prefix;
use App\Models\Company;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class EmailTemplateController extends Controller
{
    public function data(){
        $authUser = Auth::user();
        $emailData = Emailtemplate::where('companyid', $authUser->companyid)->get();
        
        $result = array(
            'emailData' => $emailData,
        );
        return response()->json($result, 200);
    }
    public function deletePrefix(){
        
    }
    public function create(Request $request){
        $input = $request->all();
        
        $validator = Validator::make($input, [
            'emailCode' => 'required|max:64',
            'subject' => 'required|max:64',
            'body' => 'required',
            'purpse' => 'required',
        ]);
        
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()],422);
        }


        $authUser = Auth::user();


        $newEmail = new Emailtemplate;
        foreach($input as $k => $v){
            $newEmail->$k = $v;
        }



        $newEmail->companyid = $authUser->companyid;

        $register = $newEmail->save();
        return response()->json([
            $register,
            'message'=> "Email template created successfully"
        ], 200);
    }
    public function update(Request $request){
        $input = $request->all();
        
        $validator = Validator::make($input, [
            'emailCode' => 'required|max:64',
            'subject' => 'required|max:64',
            'body' => 'required',
        ]);
        
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }


        $authUser = Auth::user();
        $srcData = Emailtemplate::where('id', $input['id'])->first();

        if($srcData->companyid != $authUser->companyid){
            return response()->json([
                'message' => 'Invalid request (unauthorized)'
            ],403);
        }

        $renameData = array();

        $data = array();
        foreach($input as $k => $v){
            if(isset($renameData[$k])){
                $key = $renameData[$k];
                $data[$key] = $v; 
            }else{
                $data[$k] = $v; 
            }
                           
        }

        $register = Emailtemplate::where('id', $input['id'])->update($data);
        return response()->json([
            $register,
            'message' => 'Email template updated successfully.'
        ], 200);

    }
    public function delete(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }
        $authUser = Auth::user();

        $orgData = Emailtemplate::where('id', $input['id'])->first();

        if($orgData->companyid != $authUser->companyid){
            return response()->json([
                'message' => 'Invalid request (unauthorized)'
            ],403);
        }

        $delete = Emailtemplate::where('id', $input['id'])->delete();
        return response()->json([
            $delete,
            'message'=> "Email template deleted successfully."
        ], 200);
    }
}
