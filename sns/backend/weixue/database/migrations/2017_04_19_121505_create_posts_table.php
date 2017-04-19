<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('author');
            $table->unsignedInteger('type');

            $table->string('data_url');
            $table->string('thumbnail_url')->nullable();
            $table->integer('org_width');
            $table->integer('org_height');
            $table->timestamps();

            $table->foreign('author')->references('id')->on('users');
            $table->foreign('type')->references('id')->on('post_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
