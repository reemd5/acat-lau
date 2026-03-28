<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('form_assignment_pcs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_assignment_id')->constrained('form_assignments')->cascadeOnDelete();
            $table->foreignId('pc_id')->constrained('pcs')->cascadeOnDelete();
            $table->unique(['form_assignment_id', 'pc_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('form_assignment_pcs');
    }
};
