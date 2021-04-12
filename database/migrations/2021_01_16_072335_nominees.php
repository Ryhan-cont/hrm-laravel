<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Nominees extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nominees', function (Blueprint $table) {
            $table->id();
            $table->integer('companyid');
            $table->integer('userid');
            $table->string('familymembername');
            $table->boolean('is_nominee')->default(0)->nullable();
            $table->string('relationshiptype');
            $table->string('verificationidfile')->nullable();
            $table->string('phone_number')->nullable();
            $table->date('birth_date');
            $table->double('share');
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
