<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStationaryRequisitionItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stationary_requisition_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stationary_requisition_id')->constrained('stationary_requisitions');
            $table->foreignId('category_id')->constrained('dropdown_items');
            $table->foreignId('subcategory_id')->constrained('dropdown_items');
            $table->foreignId('item')->constrained('dropdown_items');
            $table->integer('quantity')->nullable();
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
        Schema::dropIfExists('stationary_requisition_items');
    }
}
