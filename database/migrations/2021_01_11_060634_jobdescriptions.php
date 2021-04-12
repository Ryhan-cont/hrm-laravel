<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Jobdescriptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobdescriptions', function (Blueprint $table) {
            $table->id();
            $table->string('skill');
            $table->string('scale');
            $table->integer('sourceid');
            $table->integer('companyid');

            $table->json('data')->default('[]');
            $table->string('others')->nullable();
            $table->integer('createdby')->nullable();
            $table->json('updatedby')->default('[]');
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
