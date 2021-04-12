<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Educationhistories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educationhistories', function (Blueprint $table) {
            $table->id();
            $table->integer('companyid');
            $table->integer('userid');

            $table->string('degreename');
            $table->string('institutename');
            $table->string('passingyear');
            $table->string('resulttype');
            $table->double('cgpa')->nullable();
            $table->double('outof')->nullable();
            $table->string('division')->nullable();
            $table->string('certificateattachment')->nullable();
            $table->string('certificatevalidationtill')->nullable();

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
