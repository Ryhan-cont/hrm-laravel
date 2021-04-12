<?php

namespace App\Http\Controllers\service;

use App\Http\Controllers\Controller;
use App\Models\DropdownItem;
use App\Models\StationaryRequisition;
use App\Models\StationaryRequisitionItem;
use App\Services\WorkFlowService;
use Illuminate\Http\Request;

use App\Models\Category;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use function Symfony\Component\String\s;


class StationaryRequisitionController extends Controller
{
    /**
     * Call the Work flow service class for full controller
     *
     * @return \Illuminate\Http\Response
     */
    private $workFlow;

    public function __construct(WorkFlowService $work_flow)
    {
        $this->middleware('auth');
        $this->workFlow = $work_flow;
    }

    public function show($id)
    {
        $req_id = (int)decryptId($id);

        $target = StationaryRequisition::find($req_id);
        $items = DB::table('stationary_requisition_items as st')
            ->leftJoin('dropdown_items as dd1', 'st.category_id', 'dd1.id')
            ->leftJoin('dropdown_items as dd2', 'st.subcategory_id', 'dd2.id')
            ->leftJoin('dropdown_items as dd3', 'st.item', 'dd3.id')
            ->where('stationary_requisition_id', $req_id)
            ->select('dd1.name as category', 'dd2.name as subcategory', 'dd3.name as item',
                'dd1.id as category_id', 'dd2.id as subcategory_id', 'dd3.id as item_id',
                'st.quantity as quantity','st.id as up_item_id')
            ->get();
        $data = [];
        foreach ($items as $item) {

            $subCetegoryData = DropdownItem::where('dropdown_id', CONST_DD_STATIONARY_ITEMS)
                ->whereIn('companyid', [$target->company_id, 0])
                ->where('parent', $item->category_id)
                ->select('id', 'name')
                ->get()->toArray();
            $itemData = DropdownItem::where('dropdown_id', CONST_DD_STATIONARY_ITEMS)
                ->whereIn('companyid', [$target->company_id, 0])
                ->where('parent', $item->subcategory_id)
                ->select('id', 'name')
                ->get()->toArray();
            array_push($data, [
                'st_item_id'=>    $item->up_item_id,
                "category" => $item->category,
                "subcategory" => $item->subcategory,
                "item" => $item->item,
                "category_id" => $item->category_id,
                "subcategory_id" => $item->subcategory_id,
                "item_id" => $item->item_id,
                "quantity" => $item->quantity,
                'subCategoryData' => $subCetegoryData,
                'itemData' => $itemData,
            ]);
        }
        return response()->json([
            'infos' => $data,
            'st_id'=>  $target->id,
            'need_by' => $target->need_by_date,
            'need_by_formatted' => date("j F, Y",strtotime($target->need_by_date)),
            'remarks' => $target->remarks,
        ]);
    }

    public function data()
    {
        $authUser = Auth::user();
        $categoryData = DropdownItem::where('dropdown_id', CONST_DD_STATIONARY_ITEMS)
            ->whereIn('companyid', [$authUser->companyid, 0])
            ->where('parent', 0)->get();

        $result = array(
            'categoryData' => $categoryData,
        );
        return response()->json($result, 200);
    }

    public function subCategory(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'parent' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $authUser = Auth::user();


        $subCetegoryData = DropdownItem::where('dropdown_id', CONST_DD_STATIONARY_ITEMS)
            ->whereIn('companyid', [$authUser->companyid, 0])
            ->where('parent',$input['parent'])->get();

        $result = array(
            'subCetegoryData' => $subCetegoryData,
        );
        return response()->json($result, 200);
    }

    public function items(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'parent' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $authUser = Auth::user();

        $itemData = DropdownItem::where('dropdown_id', CONST_DD_STATIONARY_ITEMS)
            ->whereIn('companyid', [$authUser->companyid, 0])
            ->where('parent', (int)$input['parent'])->get();

        $result = array(
            'itemData' => $itemData,
        );
        return response()->json($result, 200);
    }

    public function store(Request $request)
    {
        $authUser = Auth()->user();
        $user_id = $authUser->id;
        if ($request->is_for_other){
            $user_id = $request->request_for;
        }
        $checkRequest = StationaryRequisition::where('company_id',$authUser->companyid)->where('user_id',$user_id)->whereIn('status',[0,-1])->count();
        if ($checkRequest > 0 && CONST_REQUEST_PROHIBIT){
            return response()->json([
                'message' => 'Already a requested is in process',
            ], 406);
        }
        try {
            DB::beginTransaction();
            /**
             * Insert request data to the "id_card_requests" table
             * ****************************************************/

            $st_request = StationaryRequisition::create([
                'company_id' => $authUser->companyid,
                'user_id' => $user_id,
                'remarks' => $request->remarks,
                'need_by_date' => date('Y-m-d', strtotime($request->on_date)),
            ]);
            $info = [];
            foreach ($request->info as $st) {
                $info['stationary_requisition_id'] = $st_request->id;
                $info['category_id'] = $st['category'];
                $info['subcategory_id'] = $st['subCategory'];
                $info['item'] = $st['categoryItem'];
                $info['quantity'] = $st['quantity'];
                StationaryRequisitionItem::create($info);
            }
            $this->workFlow->setAction($request, $st_request['id']);

            DB::commit();
            $response['data'] = '';
            $response['message'] = 'Stationary requisition sent successfully';

            return response()->json($response, 200);
        } catch (Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();

            return response()->json($response, 500);
        }
    }
    public function update($id, Request $request){
        $req_id = (int)decryptId($id);
        StationaryRequisition::where('id',$request->st_id)->update([
           'need_by_date' => date('Y-m-d', strtotime($request->on_date)),
            'remarks' => $request->remarks,

        ]);
        $info = [];
        foreach ($request->info as $st) {
            $info['category_id'] = $st['category_id'];
            $info['subcategory_id'] = $st['subcategory_id'];
            $info['item'] = $st['item_id'];
            $info['quantity'] = $st['quantity'];
            if (isset($st['st_item_id'])){
                StationaryRequisitionItem::where('id', $st['st_item_id'])->update($info);
            }else{
                $info['stationary_requisition_id'] = $request->st_id;
                StationaryRequisitionItem::create($info);
            }
        }
        if ($request->delete_ids){
            StationaryRequisitionItem::destroy($request->delete_ids);
        }
        $this->workFlow->setAction($request, $req_id);
        return response()->json([
            'message' => 'Stationary requisition update successfully'
        ], 200);

    }
}
