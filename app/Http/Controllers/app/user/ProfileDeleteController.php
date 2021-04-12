<?php

namespace App\Http\Controllers\app\user;

use App\Http\Controllers\Controller;
use App\Models\Educationhistory;
use App\Models\EmployeeDocument;
use App\Models\Jobhistory;
use App\Models\Nominee;
use App\Models\Skillmatrice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileDeleteController extends Controller
{
    public function eduDelete($id){
        $AuthUser = auth()->user();
        $edu_id = (int)decryptId($id);
        $target_data = Educationhistory::find($edu_id);
        $permission = true;
        if (!$target_data){
            $permission = false;
        }
        if ($AuthUser->companyid != $target_data->companyid){
            $permission = false;
        }
        if ($permission == false){
            return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
        }
        $result = Educationhistory::destroy($edu_id);
        if ($result){
            $filePath = 'public/company-' . $AuthUser->companyid . '/user-' .$target_data->userid. '/document';
            Storage::delete($filePath . '/' . $target_data->certificateattachment);
            return response()->json([
                $result,
                'message' => "Education history deleted successfully.",
            ], 200);
        }
        return response()->json([
            $result,
            'message' => "Education history delete unsuccessful.",
        ], 404);
    }
    public function JobHistoryDelete($id){
        $job_id = (int)decryptId($id);
        $AuthUser = auth()->user();
        $target_data = Jobhistory::find($job_id);
        $permission = true;
        if (!$target_data){
            $permission = false;
        }
        if ($AuthUser->companyid != $target_data->companyid){
            $permission = false;
        }
        if ($permission == false){
            return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
        }
        $result = Jobhistory::destroy($job_id);
        if ($result){
            return response()->json([
                $result,
                'message' => "Job History deleted successfully.",
            ], 200);
        }
        return response()->json([
            $result,
            'message' => "Job History delete unsuccessful.",
        ], 404);


    }
    public function NomineeDelete($id){
        $nominee_id =  (int)decryptId($id);
        $AuthUser = auth()->user();
        $target_data = Nominee::find($nominee_id);
        if (!$target_data){
            return response()->json(['message' => 'The action cannot be performed'], 406);
        }
        $permission = true;
        if ($AuthUser->companyid != $target_data->companyid){
            $permission = false;
        }
        if ($permission == false){
            return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
        }
        $result = Nominee::destroy($nominee_id);
        if ($result){
            $filePath = 'public/company-' . $AuthUser->companyid . '/user-' .$target_data->userid. '/document';
            Storage::delete($filePath . '/' . $target_data->verificationidfile);
            return response()->json([
                $result,
                'message' => "Nominee deleted successfully.",
            ], 200);
        }
        return response()->json([
            $result,
            'message' => "Nominee delete unsuccessful.",
        ], 404);

    }
    public function SkillDelete($id){

        $AuthUser = auth()->user();
        $skill_id = (int)decryptId($id);
        $target_data = Skillmatrice::find($skill_id);
        $permission = true;
        if (!$target_data){
            $permission = false;
        }
        if ( $AuthUser->companyid != $target_data->companyid){
            $permission = false;
        }
        if ($permission == false){
            return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
        }
        $result = Skillmatrice::destroy($skill_id);
        if ($result){
            return response()->json([
                $result,
                'message' => "Skill deleted successfully.",
            ], 200);
        }
        return response()->json([
            $result,
            'message' => "Skill delete unsuccessful.",
        ], 404);


    }
    public function EmployeeDocumentDelete($id){
        $AuthUser = auth()->user();
        $doc_id = (int)decryptId($id);
        $target_data = EmployeeDocument::find($doc_id);
        $permission = true;
        if (!$target_data){
            $permission = false;
        }
        if ($AuthUser->companyid != $target_data->company_id){
            $permission = false;
        }

        if ($permission == false){
            return response()->json(['message' => 'You are not permitted to complete this task', 'title' => 'Error!!!'], 403);
        }
        $result = EmployeeDocument::destroy($doc_id);
        if ($result){
            $filePath = 'public/company-' . $AuthUser->companyid . '/user-' .$target_data->user_id. '/document';
            Storage::delete($filePath . '/' . $target_data->document_attachment);
            return response()->json([
                $result,
                'message' => "Employee document deleted successfully.",
            ], 200);
        }
        return response()->json([
            $result,
            'message' => "Employee document delete unsuccessful.",
        ], 404);

    }
}
