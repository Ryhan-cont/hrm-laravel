<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Masterpackages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('masterpackages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->integer('companyid');
            $table->longText('comment')->nullable();

            $table->json('data')->default('[]');
            $table->json('others')->default('[]');
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
