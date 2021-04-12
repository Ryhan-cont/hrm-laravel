<?php

namespace App\Http\Controllers\app\masterdata;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Classes\Tools;

use App\Models\Employee;

use App\Models\Masterpackage;
use App\Models\Assetpackage;
use App\Models\Prefix;
use App\Models\Company;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class AssetPackageController extends Controller
{
    public function data(){
        $authUser = Auth::user();

        $assetBaseData = Assetpackage::where('companyid', $authUser->companyid)->get();

        $assetName = array();
        foreach($assetBaseData as $v){
            if(isset($v['asset'])){
                $assetName[]=$v['asset'];
            }
        }
        $assetName = array_values(array_unique($assetName));
        $assetData = Tools::arrayGroup($assetBaseData, 'sourceid');

        $masterData = Masterpackage::where('type' , CONST_ASSET_PACKAGE)->where('companyid', $authUser->companyid)->get();
        $assetPackage = array();
        foreach($masterData as $v){
            if(isset($assetData[$v['id']])){$v['asset'] = $assetData[$v['id']];}else{$v['asset'] = array();}
            $assetPackage[]=$v;
        }

        $result = array(
            'assetName' =>$assetName,
            'assetPackage' => $assetPackage,
        );
        return response()->json($result, 200);
    }
    public function create(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'packageTitle' => 'required|max:64',
            'assetData.*.asset' => 'required',
            'assetData.*.quantity' => 'required|integer',
            'assetData.*.duration' => 'required|integer',
            'assetData.*.interval' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }


        $authUser = Auth::user();

        \DB::beginTransaction();

        try{

            $masterPackage = new Masterpackage;
            $masterPackage->name = $input['packageTitle'];
            if(isset($input['comment'])){$masterPackage->comment = $input['comment'];}
            $masterPackage->type = CONST_ASSET_PACKAGE;
            $masterPackage->companyid = $authUser->companyid;

            $registerMasterPackage = $masterPackage->save();

            foreach($input['assetData'] as $v){
                $package = new Assetpackage;

                $package->asset = $v['asset'];
                $package->quantity = $v['quantity'];
                $package->duration = $v['duration'];
                $package->interval = $v['interval'];


                $package->companyid = $authUser->companyid;
                $package->sourceid = $masterPackage->id;

                $registerPackage = $package->save();
            }

        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
        \DB::commit();
        return response()->json([
            $registerPackage,
            'message' => 'Asset package created successfully.'
        ], 200);
    }
    public function update(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'packageTitle' => 'sometimes|required|max:64',
            'id' => 'required',
            'assetData.*.asset' => 'required',
            'assetData.*.quantity' => 'required|integer',
            'assetData.*.duration' => 'required|integer',
            'assetData.*.interval' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->errors()
            ],422);
        }


        $authUser = Auth::user();

        \DB::beginTransaction();

        try{

            $masterPackage = array();
            if(isset($input['packageTitle'])){$masterPackage['name'] = $input['packageTitle'];}
            if(isset($input['comment'])){$masterPackage['comment'] = $input['comment'];}


            $update = Masterpackage::where('id', $input['id'])->update($masterPackage);
            $delete = Assetpackage::where('sourceid', $input['id'])->delete();

            foreach($input['assetData'] as $v){
                $package = new Assetpackage;

                $package->asset = $v['asset'];
                $package->quantity = $v['quantity'];
                $package->duration = $v['duration'];
                $package->interval = $v['interval'];


                $package->companyid = $authUser->companyid;
                $package->sourceid = $input['id'];

                $registerPackage = $package->save();
            }

        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                'message' => $e->getMessage()
            ],500);
        }
        \DB::commit();
        return response()->json([
            $registerPackage,
            'message' => "Asset package updated successfully"
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

        $masterData = Masterpackage::where('id', $input['id'])->first();

        if($masterData->companyid != $authUser->companyid){
            return response()->json([
                'message' => 'Invalid request (unauthorized)'
            ],403);
        }

        $emp = Employee::where('assetpackage',$input['id'])->count();
        if ($emp > 0){
            return response()->json([
                'message' => "This asset is used for ".$emp." employee(s).",
            ], 406);

        }

        $delete = Masterpackage::where('id', $input['id'])->delete();
        $deleteAsset = Assetpackage::where('sourceid', $input['id'])->delete();
        return response()->json([
            $delete,
            'message'=>"Asset package deleted successfully"
        ], 200);
    }
}
