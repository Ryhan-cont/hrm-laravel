<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Employees extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->integer('companyid');
            $table->integer('userid')->unique();
            $table->string('emp_id')->nullable();
            $table->string('personalemail')->nullable();
            $table->string('officeemail')->nullable();
            $table->string('personalmobile')->nullable();
            $table->string('officemobile')->nullable();
            $table->string('verificationidtype')->nullable();
            $table->string('verificationidnumber')->nullable();
            $table->string('verificationidfile')->nullable();
            $table->string('nationality')->nullable();
            $table->string('bloodgroup')->nullable();
            $table->string('dateofbirth')->nullable();
            $table->string('gender')->nullable();
            $table->string('religion')->nullable();
            $table->boolean('meritalstatus')->nullable();
            $table->string('presentaddressline1')->nullable();
            $table->string('presentaddressline2')->nullable();
            $table->string('presentaddresspostcode')->nullable();
            $table->string('presentaddresscity')->nullable();
            $table->string('permanentaddressline1')->nullable();
            $table->string('permanentaddressline2')->nullable();
            $table->string('permanentaddresspostcode')->nullable();
            $table->string('permanentaddresscity')->nullable();

            $table->string('designation');
            $table->integer('organizationtree');
            $table->string('jobdescription');
            $table->string('payrollpackage');
            $table->string('leavepackage');
            $table->string('assetpackage')->nullable();
            $table->string('employeetype');
            $table->date('contract_start_date')->nullable();
            $table->date('contract_end_date')->nullable();
            $table->integer('supervisor')->nullable();

            $table->json('data')->default('[]');
            $table->json('others')->default('[]');
            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
