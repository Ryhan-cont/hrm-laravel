<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Menumodules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menumodules', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->integer('moduleid')->nullable();
            $table->string('menuname');
            $table->integer('menuid')->nullable();
            $table->boolean('is_visible')->nullable();
            $table->boolean('is_active')->nullable();
            $table->boolean('site_active')->nullable();
            $table->string('url')->nullable();
            $table->string('icon')->nullable();
            $table->string('type')->nullable();
            $table->string('disable_note')->nullable();
            $table->string('remark')->nullable();
            $table->string('rowtype');
            $table->string('rowid');
            
            $table->json('data')->default('[]');
            $table->json('others')->default('[]');
            $table->softDeletes($column = 'deleted_at', $precision = 0);
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
