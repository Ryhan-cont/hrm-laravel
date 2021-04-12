<?php

namespace App\Http\Controllers\app\masterdata;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Loiorganization;
use App\Models\Prefix;
use App\Models\Company;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class LOIOrganizationController extends Controller
{
    public function data(){
        $authUser = Auth::user();

        $loiOrganization =  DB::table('loiorganizations as loi')
            ->leftJoin('dropdown_items as d','loi.type','d.id')
            ->select('loi.*','d.name as type_name')
            ->where('loi.companyid',$authUser->companyid)
            ->get();

        return response()->json([
            'loiOrganization' => $loiOrganization,
        ], 200);
    }
    public function addPrefix(){

    }
    public function create(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'orgType' => 'required|max:64',
            'orgName' => 'required|max:64',
            'organizationAddress' => 'required|max:250',
            'letterAddressTo' => 'required|max:64',

        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()],422);
        }


        $authUser = Auth::user();

        $renameData = array(
            'orgType' => 'type',
            'orgName' => 'name',
            'organizationAddress' => 'address',
            'letterAddressTo' => 'addressto',
        );


       $loiOrg = new Loiorganization;
        $loiOrg->type = $input['orgType'];
        $loiOrg->name = $input['orgName'];
        $loiOrg->address = $input['organizationAddress'];
        $loiOrg->letter_to = $input['letterAddressTo'];
        $loiOrg->companyid = $authUser->companyid;

        $register = $loiOrg->save();
        return response()->json([$register,'message' => 'LOI created successfully'], 200);
    }
    public function update(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'orgType' => 'required|max:64',
            'orgName' => 'required|max:64',
            'organizationAddress' => 'required|max:250',
            'letterAddressTo' => 'required|max:64',

        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()],422);
        }


        $authUser = Auth::user();
        $srcData = Loiorganization::where('id', $input['id'])->first();

        if($srcData->companyid != $authUser->companyid){
            return response()->json(['message' => 'Invalid request (unauthorized)'],403);
        }

        $renameData = array(
            'orgType' => 'type',
            'orgName' => 'name',
            'organizationAddress' => 'address',
            'letterAddressTo' => 'addressto',
        );

        $data =[];
        $data['type'] = $input['orgType'];
        $data['name'] = $input['orgName'];
        $data['address'] = $input['organizationAddress'];
        $data['letter_to'] = $input['letterAddressTo'];
        $register = Loiorganization::where('id', $input['id'])->update($data);
        return response()->json([$register, 'message' => 'LOI updated successfully'], 200);

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

        $orgData = Loiorganization::find($input['id']);
        if (!$orgData){
            return response()->json(['message' => 'Not found)'],404);
        }

        if($orgData->companyid != $authUser->companyid){
            return response()->json(['message' => 'Invalid request (unauthorized)'],403);
        }

        $delete = Loiorganization::destroy($input['id']);
        return response()->json([$delete, 'message' => 'LOI deleted successfully'], 200);
    }
}
