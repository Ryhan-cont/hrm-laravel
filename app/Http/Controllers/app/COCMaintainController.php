<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\CocMaintain;
use App\Models\HrPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class COCMaintainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $auth = auth()->user();

        $company_id = $auth->companyid;
        $infos = DB::table('coc_maintains as coc')
            ->leftJoin('dropdown_items as dd1','coc.coc_cat_id','dd1.id' )
            ->leftJoin('dropdown_items as dd2','coc.coc_cat_item_id','dd2.id' )
            ->leftJoin('work_groups as wg','coc.group_id','wg.id' )
            ->select('coc.id','coc.coc_name','dd1.name as category_name','dd1.id as category_id',
                DB::raw("DATE_FORMAT(coc.`updated_at`, '%d-%b-%Y') AS last_update"),
                'dd2.name as item_name','dd2.id as item_id','wg.name as group_name','wg.id as group_id','coc.coc','coc.attachment')
            ->where('coc.company_id', $company_id)->get();

        if ($auth->roleid < CONST_ROLE_USER){
            $isUser = false;
        }else{
            $isUser = true;
        }


        return response()->json(['isUser'=>$isUser,'infos'=>$infos, 'attachmentUrl'=>   $filePath = 'storage/company-' . $company_id . '/coc/'],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);

        $auth = auth()->user();
        $company_id = $auth->companyid;


        if ($request->hasFile('Attachment')) {
            $encrypted_name = Str::random(16);
            $target_Attachment = $request->file('Attachment');
            $fileExt = $target_Attachment->getClientOriginalExtension();
            $coc_attachment = $encrypted_name . '.' . $fileExt;
        }else{
            $coc_attachment = null;
        }

        $hr_results = CocMaintain::create([
            'company_id'=> $company_id,
            'coc_name' =>$input['coc_name'],
            'coc' =>$input['coc'],
            'coc_cat_id' =>$input['selectedCategory'],
            'coc_cat_item_id' =>$input['selectedItem'],
            'group_id' =>$input['selectedGroup'],
            'attachment' => $coc_attachment,
        ]);
        if ($coc_attachment != null){
            if ($hr_results && $request->hasFile('Attachment')) {
                $filePath = 'public/company-' . $company_id . '/coc/';
                $target_Attachment->storeAs($filePath, $coc_attachment);

            }
        }
        return response()->json([
            'message'=> "COC created successfully"
        ],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $input = $request->all();
        $input = json_decode($input['data'], true);

        $auth = auth()->user();
        $company_id = $auth->companyid;
        $target_coc = CocMaintain:: findOrFail($input['id']);
        if (!$target_coc){
            return response(['message'=>"This coc is not found"],404);
        }


        try {
            if ($request->hasFile('Attachment')) {
                $encrypted_name = Str::random(16);
                $target_Attachment = $request->file('Attachment');
                $fileExt = $target_Attachment->getClientOriginalExtension();
                $coc_attachment = $encrypted_name . '.' . $fileExt;
            }else{
                $coc_attachment = $target_coc->attachment;
            }

            $hr_results = CocMaintain::where('id',$input['id'])->update([
                'coc_name' =>$input['coc_name'],
                'coc' =>$input['coc'],
                'coc_cat_id' =>$input['selectedCategory'],
                'coc_cat_item_id' =>$input['selectedItem'],
                'group_id' =>$input['selectedGroup'],
                'attachment' => $coc_attachment,
            ]);
            if ($coc_attachment != null){
                if ($hr_results && $request->hasFile('Attachment')) {
                    $filePath = 'public/company-' . $company_id . '/coc/';
                    Storage::delete($filePath . '/' . $target_coc->attachment);
                    $target_Attachment->storeAs($filePath, $coc_attachment);

                }
            }
            return response()->json([
                'message'=> "COC updated successfully"
            ],200);

        }catch (\Exception $e) {
            DB::rollback();
            $response['data'] = '';
            $response['message'] = $e->getMessage();

            return response()->json($response, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $tt =  CocMaintain::findOrFail($id);
        if (!$tt){
            return response()->json(['message'=>'Not found'],404);
        }
        CocMaintain::destroy($id);
        return response()->json([
            'message'=>'COC deleted successfully'
        ],200);
    }
}
