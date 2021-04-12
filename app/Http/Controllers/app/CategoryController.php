<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Category;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{

    public function data(){
        $authUser = Auth::user();

        $categoryData = Category::where('companyid', $authUser->companyid)->get();

        
        $parentData = array();
        foreach($categoryData as $v){
            $v['editMode']=false;
            $parentData[$v['parent']][]=$v;
        }

        $categories = array();
        foreach($parentData[0] as $v){
            if(isset($parentData[$v['id']])){
                $subCat = array();
                foreach($parentData[$v['id']] as $p){
                    if(isset($parentData[$p['id']])){
                        $p['children'] = $parentData[$p['id']];
                    }else{
                        $p['children'] = array();
                    }
                    $subCat[]=$p;
                }
                $v['children'] = $subCat;
            }else{
                $v['children'] = array();
            }
            $categories[]=$v;
        }

        $result = array(
            'categoryData' => $categories,
        );
        return response()->json($result, 200);

    }
    public function create(Request $request){
        $input = $request->all();
        //dd($input);

        if($input['type'] != 'category' && $input['type'] != 'subCategory' && $input['type'] != 'item'){
            return response()->json(['errors' => 'Invalide type'],422);
        }

        if($input['type'] == 'category'){
            $validator = Validator::make($input, [
                'name' => 'required|max:48',
                'type' => 'required|max:48'
            ]); 
        }
        if($input['type'] == 'subCategory' || $input['type'] == 'item'){
            $validator = Validator::make($input, [
                'name' => 'required|max:48',
                'type' => 'required|max:48',
                'parent' => 'required|max:48'
            ]); 
        }
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()],422);
        }

        $authUser = Auth::user();

        $newCategory = new Category;
        $newCategory->name = $input['name'];

        if($input['type'] == 'category'){
            $newCategory->parent = 0;
        }
        if($input['type'] == 'subCategory' || $input['type'] == 'item'){
            $newCategory->parent = $input['parent'];
        }

        $newCategory->companyid = $authUser->companyid;

        $registerCategory = $newCategory->save();
        return response()->json($registerCategory, 200);


    }

    public function update(Request $request){
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|max:48',
            'id' => 'required|max:48'
        ]); 

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()],422);
        }

        $updateData = array();
        $updateData['name'] = $input['name'];
        $update = Category::where('id', $input['id'])->update($updateData);

        return response()->json($update, 200);
    }

    public function delete(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $authUser = Auth::user();

        $categoryData = Category::where('companyid', $authUser->companyid)->get();
        $target = null;
        $parentData = array();
        foreach($categoryData as $v){
            $v['editMode']=false;
            $parentData[$v['parent']][]=$v;
            if($v['id'] == $input['id']){$target = $v;}
        }

        if(is_array($target)){
            return response()->json(['errors' => 'Id not found.'],422);
        }

        if($target->companyid != $authUser->companyid){
            return response()->json(['error' => 'Invalid request (unauthorized)'],403);
        }

        \DB::beginTransaction();

        try{  
            $delete = Category::where('id', $input['id'])->delete();

            if(isset($parentData[$target['id']])){
                $deleteSubItem = Category::where('parent', $target['id'])->delete();
                foreach($parentData[$target['id']] as $v){
                    if(isset($parentData[$v['id']])){
                        $deleteSubItem = Category::where('parent', $v['id'])->delete();
                    }
                }
            }

            
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json(['errors' => $e->getMessage()],500);
        }
        \DB::commit();
        return response()->json($delete, 200);
    }
}
