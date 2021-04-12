<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateWfProcessDefsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wf_process_defs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies');
            $table->foreignId('wf_process_id')->constrained('wf_processes');
            $table->integer('sequence');
            $table->foreignId('approver')->nullable()->constrained('users');
            $table->foreignId('work_group_id')->nullable()->constrained('work_groups');
            $table->boolean('final_stage')->default(0);
            $table->string('accept_text')->nullable();
            $table->string('pending_text')->nullable();
            $table->string('reject_text')->nullable();
            $table->string('sla_type', 8)->nullable();
            $table->double('sla')->default(0);
            $table->double('sla_minutes')->default(0);
            $table->string('email_cc', 512)->nullable();
            $table->timestamp('created_at')->useCurrent();
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
        Schema::dropIfExists('wf_process_defs');
    }
}
