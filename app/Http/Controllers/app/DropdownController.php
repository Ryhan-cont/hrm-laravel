<?php

namespace App\Http\Controllers\app;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Dropdown;
use App\Models\DropdownItem;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class DropdownController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }

    public function data(){
        $auth_user = Auth::user();
        $data = Dropdown::select('id', 'name', 'type', 'devonly')->get();
        $can_modify = $auth_user->roleid === CONST_ROLE_DEVELOPER ||
                        $auth_user->roleid === CONST_ROLE_SUPER_ADMIN;

        return response()->json(['dropdowns' => $data, 'can_modify' => $can_modify], 200);
    }

    public function create(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'dropdownName' => 'required|unique:App\Models\Dropdown,name|max:64',
            'dropdownType' => 'required|max:64',
            'dropdownDevOnly' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $authUser = Auth::user();

        $dropdown = new Dropdown;
        $dropdown->name = $input['dropdownName'];
        $dropdown->devonly = $input['dropdownDevOnly'];
        $dropdown->type = $input['dropdownType'];
        $dropdown->companyid = $authUser->companyid;

        $register = $dropdown->save();


        return response()->json([
           'status' => $register,
           'message' => 'Dropdown created successfully'
        ], 200);
    }
    public function update(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required',
            'dropdownName' => 'sometimes|required|unique:App\Models\Dropdown,name,' . $input['id'] . '|max:64',
            'dropdownDevOnly' => 'sometimes|required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {

            $dropdownArr = array();
            if (isset($input['dropdownName'])) {
                $dropdownArr['name'] = $input['dropdownName'];
            }
            if (isset($input['dropdownDevOnly'])) {
                $dropdownArr['devonly'] = $input['dropdownDevOnly'];
            }

            $update = Dropdown::where('id', $input['id'])->update($dropdownArr);

        } catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 500);
        }
        return response()->json([
            'status' => $update,
            'message' => 'Dropdown updated successfully'
        ], 200);

    }

    public function delete(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            $auth_user = Auth::user();

            $query = Dropdown::where('id', '=', $input['id'])->firstOrFail();
            if ($auth_user->roleid !== CONST_ROLE_DEVELOPER ||
                $auth_user->roleid !== CONST_ROLE_SUPER_ADMIN) {
                $query->where('companyid', '=', $auth_user->companyid);
            }
            $deleteItem = DropdownItem::where('dropdown_id', $query->id)->delete();
            $delete = Dropdown::where('id', $query->id)->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['errors' => $e->getMessage()], 500);
        }

        return response()->json([
            'status' => $delete,
            'message' => 'Dropdown deleted successfully'
        ], 200);
    }


    /*
     * Dropdown items
     * ***********************/
    public function items(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }
        $auth_user = Auth::user();

        $items = DropdownItem::select('id', 'name', 'parent', 'dropdown_id', 'companyid')
                                    ->where('dropdown_id', $input['id'])->get();

        $drop_down_items = [];

        foreach ($items as $item) {
            if ($auth_user->roleid !== CONST_ROLE_DEVELOPER ||
                $auth_user->roleid !== CONST_ROLE_SUPER_ADMIN) {
                $item->can_modify = $item->companyid === $auth_user->companyid;
            }else{
                $item->can_modify = true;
            }

            array_push($drop_down_items, [
                'id' => $item->id,
                'name' => $item->name,
                'dropdown_id' => $item->dropdown_id,
                'can_modify' => $item->can_modify
            ]);
        }

        return response()->json($drop_down_items, 200);
    }

    public function createItem(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'itemName' => 'required|max:255',
            'dropdown_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $dropdown = Dropdown::where('id', $input['dropdown_id'])->first();

        if($dropdown == null){
            return response()->json(['message' => 'Dropdown not found'], 422);
        }else{
            $dropdown_id = $dropdown->id;
        }

        $dropdownData = new DropdownItem;
        $dropdownData->name = $input['itemName'];
        $dropdownData->dropdown_id = $dropdown_id;
        //$dropdownData->companyid = $dropdown_id;
        $auth_user = Auth::user();
        if ($auth_user->roleid !== CONST_ROLE_DEVELOPER ||
            $auth_user->roleid !== CONST_ROLE_SUPER_ADMIN) {
            $dropdownData->companyid = $auth_user->companyid;
        }else{
            $dropdownData->companyid = 0;
        }
        $register = $dropdownData->save();
        return response()->json([
            'status' => $register,
            'message' => 'Item created successfully'
         ], 200);
    }

    /**
     * Update dropdown item
     * ***************************/
    public function updateItem(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'dropdown_id' => 'required|integer',
            'itemName' => 'required|max:255',
            'id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $dropdown = Dropdown::where('id', $input['dropdown_id'])->firstOrFail();
        if($dropdown == null){
            return response()->json(['message' => 'Dropdown not found'], 406);
        }

        $dropdownData = DropdownItem::where('id', $input['id'])->firstOrFail();
        if($dropdownData == null){
            return response()->json(['message' => 'Dropdown item not found'], 406);
        }else{
            $dropdownItemId = $dropdownData->id;
        }

        $dropdownData = array();
        $dropdownData['name'] = $input['itemName'];
        $register = DropdownItem::where('id', $dropdownItemId)->update($dropdownData);
        return response()->json([
            'status' => $register,
            'message' => 'Item updated successfully'
         ], 200);
    }

    public function deleteItem(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }
        $delete = DropdownItem::where('id', $input['id'])->delete();
        return response()->json([
            'status' => $delete,
            'message' => 'Item deleted successfully'
         ], 200);
    }


    public function categories(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $categoryData = DropdownItem::select('id', 'companyid', 'is_active', 'name', 'parent')
                                    ->where('dropdown_id', $input['id'])->get();

        $authUser = Auth::user();

        $parentData = array();
        $categories = array();


        if(count($categoryData)>0){
            foreach($categoryData as $v){
                $v['editMode']=false;
                $parentData[$v['parent']][]=$v;
            }

            $categories = [];
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
        }

        return response()->json($categories, 200);
    }

    public function createCategory(Request $request)
    {
        $input = $request->all();
        //dd($input);

        if ($input['type'] != 'category' && $input['type'] != 'subCategory' && $input['type'] != 'item') {
            return response()->json(['message' => 'Invalid type'], 422);
        }

        $dropdown = Dropdown::where('id', $input['dropdown_id'])->firstOrFail();

        if ($dropdown == null) {
            return response()->json(['message' => 'Dropdown not found'], 422);
        } else {
            $dropdown_id = $dropdown->id;
        }

        if ($input['type'] == 'category') {
            $validator = Validator::make($input, [
                'name' => 'required|max:48',
                'type' => 'required|max:48'
            ]);
        }
        if ($input['type'] == 'subCategory' || $input['type'] == 'item') {
            $validator = Validator::make($input, [
                'name' => 'required|max:48',
                'type' => 'required|max:48',
                'parent' => 'required|max:48'
            ]);
        }
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $authUser = Auth::user();

        $newCategory = new DropdownItem;
        $newCategory->name = $input['name'];
        $newCategory->dropdown_id = $dropdown_id;

        if ($input['type'] == 'category') {
            $newCategory->parent = 0;
        }
        if ($input['type'] == 'subCategory' || $input['type'] == 'item') {
            $newCategory->parent = $input['parent'];
        }

        $newCategory->companyid = $authUser->companyid;

        $registerCategory = $newCategory->save();

        return response()->json([
            'status' => $registerCategory,
            'message' => ucfirst($input['type']) . ' created successfully'
        ], 200);
    }

    public function updateCategory(Request $request){
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
        $update = DropdownItem::where('id', $input['id'])->update($updateData);

        return response()->json([
            'status' => $update,
            'message' => 'Updated successfully'
         ], 200);
    }

    public function deleteCategory(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $authUser = Auth::user();

        $categoryData = DropdownItem::where('companyid', $authUser->companyid)->get();
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

        DB::beginTransaction();
        try{
            $delete = DropdownItem::where('id', $input['id'])->delete();

            if(isset($parentData[$target['id']])){
                $deleteSubItem = DropdownItem::where('parent', $target['id'])->delete();
                foreach($parentData[$target['id']] as $v){
                    if(isset($parentData[$v['id']])){
                        $deleteSubItem = DropdownItem::where('parent', $v['id'])->delete();
                    }
                }
            }
            DB::commit();

        }catch(\Exception $e){
            DB::rollback();
            return response()->json(['errors' => $e->getMessage()],500);
        }

        return response()->json([
            'status' => $delete,
            'message' => 'Deleted successfully'
         ], 200);
    }

    public function categoryList(Request $request){

        $parent_id = $request->parent_id;
        $dropdown_id = $request->dropdown_id;

        $authUser = Auth::user();
        $items = DropdownItem::where('dropdown_id', $dropdown_id)
            ->whereIn('companyid', [$authUser->companyid, 0])
            ->where('parent', $parent_id)
            ->select('id', 'name')
            ->get();

        return response()->json([
            'items' => $items,
        ], 200);
    }
    public function subCategoryList($parent_id){

    }
    public function categoryItemList($parent_id){

    }

/*axios.get('/api', {
params: {
foo: 'bar'
}
});*/
}
