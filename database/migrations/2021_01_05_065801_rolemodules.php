<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Rolemodules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rolemodules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('apiname');
            $table->integer('moduleid');
            $table->integer('roleid');
            $table->boolean('is_visible')->default(true);
            $table->boolean('is_active')->default(true);
            $table->boolean('site_active')->default(false);
            $table->string('url')->nullable();
            $table->string('icon')->nullable();
            $table->string('type');
            $table->json('subpermissions')->default('[]');
            $table->string('disable_note')->nullable();
            $table->string('remark')->nullable();
            
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
