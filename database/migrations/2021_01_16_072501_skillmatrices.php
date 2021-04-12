<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Skillmatrices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skillmatrices', function (Blueprint $table) {
            $table->id();

            $table->integer('companyid');
            $table->integer('userid');
            $table->string('skillsname');
            $table->string('skillsscale');

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
