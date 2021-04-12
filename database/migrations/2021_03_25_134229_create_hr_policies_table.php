<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHrPoliciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hr_policies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies');
            $table->string('policy_name', 512)->nullable();
            $table->text('policy')->nullable();
            $table->string('policy_keyword', 512)->nullable();
            $table->foreignId('policy_cat_id')->constrained('dropdown_items');
            $table->foreignId('policy_cat_item_id')->constrained('dropdown_items');
            $table->foreignId('group_id')->constrained('work_groups');
            $table->string('attachment', 512)->nullable();
            $table->tinyInteger('status')->default(0);
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
        Schema::dropIfExists('hr_policies');
    }
}
