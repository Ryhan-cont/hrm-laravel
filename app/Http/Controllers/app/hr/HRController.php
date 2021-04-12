<?php

namespace App\Http\Controllers\app\hr;

use App\Http\Controllers\Controller;
use App\Models\DropdownItem;
use App\Models\HrPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HRController extends Controller
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
        $infos = DB::table('hr_policies as hr')
            ->leftJoin('dropdown_items as dd1','hr.policy_cat_id','dd1.id' )
            ->leftJoin('dropdown_items as dd2','hr.policy_cat_item_id','dd2.id' )
            ->leftJoin('work_groups as wg','hr.group_id','wg.id' )
            ->select('hr.id','hr.policy_name','dd1.name as category_name','dd1.id as category_id','hr.policy_keyword',
                DB::raw("DATE_FORMAT(hr.`updated_at`, '%d-%b-%Y') AS last_update"),
                'dd2.name as item_name','dd2.id as item_id','wg.name as group_name','wg.id as group_id','hr.policy','hr.attachment')
            ->where('hr.company_id', $company_id)->get();

        if ($auth->roleid < CONST_ROLE_USER){
            $isUser = false;
        }else{
            $isUser = true;
        }


        return response()->json(['isUser'=>$isUser,'infos'=>$infos, 'attachmentUrl'=>   $filePath = 'storage/company-' . $company_id . '/hr-policy/'],200);
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
                $policy_attachment = $encrypted_name . '.' . $fileExt;
            }else{
                $policy_attachment = null;
            }

            $hr_results = HrPolicy::create([
                'company_id'=> $company_id,
                'policy_name' =>$input['policy_name'],
                'policy' =>$input['policy'],
                'policy_keyword' =>$input['key_word'],
                'policy_cat_id' =>$input['selectedCategory'],
                'policy_cat_item_id' =>$input['selectedItem'],
                'group_id' =>$input['selectedGroup'],
                'attachment' => $policy_attachment,
            ]);
            if ($policy_attachment != null){
                if ($hr_results && $request->hasFile('Attachment')) {
                    $filePath = 'public/company-' . $company_id . '/hr-policy/';
                    $target_Attachment->storeAs($filePath, $policy_attachment);

                }
            }
            return response()->json([
                'message'=> "HR policy created successfully"
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
        $target_policy = HrPolicy:: findOrFail($input['id']);
        if (!$target_policy){
            return response(['message' => "This policy is not found"], 404);
        }


        try {
            if ($request->hasFile('Attachment')) {
                $encrypted_name = Str::random(16);
                $target_Attachment = $request->file('Attachment');
                $fileExt = $target_Attachment->getClientOriginalExtension();
                $policy_attachment = $encrypted_name . '.' . $fileExt;
            }else{
                $policy_attachment = $target_policy->attachment;
            }

            $hr_results = HrPolicy::where('id',$input['id'])->update([
                'policy_name' =>$input['policy_name'],
                'policy' =>$input['policy'],
                'policy_keyword' =>$input['key_word'],
                'policy_cat_id' =>$input['selectedCategory'],
                'policy_cat_item_id' =>$input['selectedItem'],
                'group_id' =>$input['selectedGroup'],
                'attachment' => $policy_attachment,
            ]);
            if ($policy_attachment != null){
                if ($hr_results && $request->hasFile('Attachment')) {
                    $filePath = 'public/company-' . $company_id . '/hr-policy/';
                    Storage::delete($filePath . '/' . $target_policy->attachment);
                    $target_Attachment->storeAs($filePath, $policy_attachment);

                }
            }
            return response()->json([
                'message'=> "HR policy updated successfully"
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
      $tt =  HrPolicy::findOrFail($id);
      if (!$tt){
          return response()->json(['message'=>'Not found'],404);
      }
      HrPolicy::destroy($id);
      return response()->json([
          'message'=>'HR policy deleted successfully'
      ],200);
    }

}
