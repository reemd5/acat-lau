<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pc_assessment_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pc_id')->constrained('pcs')->cascadeOnDelete();
            $table->foreignId('assessment_method_id')->constrained('assessment_methods')->cascadeOnDelete();
            $table->unique(['pc_id', 'assessment_method_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pc_assessment_methods');
    }
};
