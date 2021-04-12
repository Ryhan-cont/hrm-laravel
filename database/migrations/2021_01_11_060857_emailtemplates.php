<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Emailtemplates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emailtemplates', function (Blueprint $table) {
            $table->id();
            $table->string('emailcode');
            $table->string('subject');
            $table->longText('body');
            $table->longText('purpse');
            $table->integer('companyid');

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
