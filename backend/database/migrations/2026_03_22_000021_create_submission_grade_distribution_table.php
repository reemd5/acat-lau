<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submission_grade_distribution', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained('submissions')->cascadeOnDelete();
            $table->string('grade_label');
            $table->unsignedInteger('student_count');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_grade_distribution');
    }
};
