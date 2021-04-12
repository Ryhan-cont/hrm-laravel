<?php

namespace App\Http\Controllers\app;


use App\Notifications\NoticeNotification;
use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Classes\Modules;
use App\Models\NoticeBoard;

use Carbon\Carbon;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NoticeBoardController extends Controller
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $authUser = Auth::user();
        $notice = DB::table('notice_boards as notice')
        ->leftJoin('work_groups as workGroup' , 'workGroup.id', '=', 'notice.notice_group')
        ->select(
            'notice.title',
            'notice.id',
            'notice.notice',
            'notice.notification_type as noticeType',
            'publish_date_time as publisDateTime',
            'expire_date_time as expireDateTime',
            'workGroup.name as noticeGroup',
            'workGroup.id as noticeGroupId'
        )
        ->where('notice.company_id', $authUser->companyid)->get();
        $permissions = Modules::premissions();
        return response()->json([
            'status' => 200,
            'permissions' => $permissions,
            'data' => $notice
        ], 200);
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'noticeTitle' => 'required|max:32',
            'notice' => 'required',
            'publishDateTime' => 'required',
            'expireDateTime' => 'required',
            'noticeGroup' => 'required|integer',
            'notificationType' => 'required|integer',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $authUser = Auth::user();

        $noticeBoard = new NoticeBoard;
        $noticeBoard->title = $request->noticeTitle;
        $noticeBoard->company_id = $authUser->companyid;
        $noticeBoard->notice = $request->notice;
        $noticeBoard->publish_date_time = Carbon::parse($request->publishDateTime)->format('Y-m-d H:i:s');
        $noticeBoard->expire_date_time =  Carbon::parse($request->expireDateTime)->format('Y-m-d H:i:s');
        $noticeBoard->notice_group = $request->noticeGroup;
        $noticeBoard->notification_type = $request->notificationType;


        $noticeBoard->save();

        return response()->json([
            'status' => $noticeBoard,
            'message' => 'Notice created successfully'
        ], 200);
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'noticeTitle' => 'required|max:32',
            'notice' => 'required',
            'publishDateTime' => 'required',
            'expireDateTime' => 'required',
            'noticeGroup' => 'required|integer',
            'notificationType' => 'required|integer',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()],422);
        }

        $authUser = Auth::user();

        $noticeBoard = NoticeBoard::find($id);
        if($noticeBoard == null){


            
        }else{
            
            if(isset($input['noticeTitle'])){$noticeBoard->title = $request->noticeTitle;}
            if(isset($input['notice'])){$noticeBoard->notice = $request->notice;}
            if(isset($input['publishDateTime'])){$noticeBoard->publish_date_time = Carbon::parse($request->publishDateTime)->format('Y-m-d H:i:s');}
            if(isset($input['expireDateTime'])){$noticeBoard->expire_date_time =  Carbon::parse($request->expireDateTime)->format('Y-m-d H:i:s');}
            if(isset($input['noticeGroup'])){$noticeBoard->notice_group = $request->noticeGroup;}
            if(isset($input['notificationType'])){$noticeBoard->notification_type = $request->notificationType;}

            $register = $noticeBoard->save();

            return response()->json([
                'status' => $register,
                'message' => 'Notice updated successfully'
            ], 200);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $noticeBoard = NoticeBoard::find($id);
        if($noticeBoard == null){

        }else{
            $delete = $noticeBoard->delete();
            return response()->json([
                'status' => $delete,
                'message' => 'Notice deleted successfully'
            ], 200);
        }

    }
    public function sendNotice(){
        $authUser = Auth::user();


        $notice = DB::table('notice_boards as notice')
        ->leftJoin('work_groups as workGroup' , 'workGroup.id', '=', 'notice.notice_group')
        ->leftJoin('work_groups as workGroupChild' , 'workGroupChild.parent_id', '=', 'notice.notice_group')
        ->leftJoin('users as user' , 'workGroupChild.user_id', '=', 'user.id')
        ->select(
            'notice.title',
            'notice.notice as notice',
            'notice.publish_date_time as publishDateTime',
            'notice.expire_date_time as expireDateTime',
            'notice.notice_group as noticeGroup',
            'notice.notification_type as notificationType',
            'workGroup.name as workGroupName',
            'workGroupChild.user_id as userId',
            'user.email as email',
            DB::raw("TRIM(CONCAT(user.first_name,' ',IFNULL(user.last_name, ''))) as userFullName"),
        )
        ->where('notice.company_id', $authUser->companyid)->get();


        $notice = $notice->groupBy('noticeGroup');
        $notice = $notice[1];


        
        foreach($notice as $v){
            $user =  User::find($v->userId);
            $user->notice = $v->notice;
            $user->subject = $v->title;
            $user->notify(new NoticeNotification($user));
        }

    }
}
