<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('start_academic_year');
            $table->string('end_academic_year');
            $table->timestamp('generated_at')->useCurrent();
            $table->string('report_path');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
