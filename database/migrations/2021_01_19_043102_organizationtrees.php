<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Organizationtrees extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organizationtrees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('serial');
            $table->string('type');
            $table->string('rccode')->nullable();
            $table->integer('typeid')->nullable();
            $table->integer('companyid');
            $table->integer('organizationid');
            $table->integer('organizationhead')->nullable();

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
