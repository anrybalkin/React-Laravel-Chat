<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
<<<<<<< Updated upstream:database/migrations/2022_08_18_211016_historymessages.php
        Schema::create('Messages', function (Blueprint $table) {
            $table->id();
            $table->string('chatID');
=======
        Schema::create('messages', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('chatID');
>>>>>>> Stashed changes:database/migrations/2022_08_26_054649_create_messages_table.php
            $table->string('username');
            $table->text('text')->nullable();
            $table->timestamp("date")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Messages');
    }
};
