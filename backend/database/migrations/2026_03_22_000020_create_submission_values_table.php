<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submission_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained('submissions')->cascadeOnDelete();
            $table->foreignId('so_id')->constrained('sos')->cascadeOnDelete();
            $table->foreignId('pc_id')->constrained('pcs')->cascadeOnDelete();
            $table->decimal('average_score', 8, 2)->nullable();
            $table->decimal('percentage_of_students_meeting_performance_standard', 5, 2)->nullable();
            $table->decimal('performance_standard', 8, 2)->nullable();
            $table->boolean('is_met')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_values');
    }
};
