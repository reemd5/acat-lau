<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('academic_year');
            $table->string('current_semester');
            $table->date('semester_start_date');
            $table->date('semester_end_date');
            $table->unsignedInteger('current_year_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
