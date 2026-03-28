<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pcs', function (Blueprint $table) {
            $table->id();
            $table->string('pc_code');
            $table->text('description');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pcs');
    }
};
