<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateWfActionLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wf_action_logs', function (Blueprint $table) {
            $table->id();
            $table->integer('ref_id')->nullable();
            $table->foreignId('wf_process_id')->constrained('wf_processes');
            $table->foreignId('wf_process_def_id')->constrained('wf_process_defs');
            $table->integer('req_id');
            $table->boolean('status')->default(0);
            $table->foreignId('action_by')->constrained('users');
            $table->foreignId('actual_requester')->nullable()->constrained('users');
            $table->foreignId('pending_to')->nullable()->constrained('users');
            $table->foreignId('work_group_id')->nullable()->constrained('work_groups');
            $table->string('remarks')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('official_create_time')->nullable();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wf_action_logs');
    }
}
