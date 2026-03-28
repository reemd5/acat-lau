<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //check if so_id exists in pcs table before adding the column
        if (!Schema::hasColumn('pcs', 'so_id')) {
        Schema::table('pcs', function (Blueprint $table) {
            $table->foreignId('so_id')->constrained('sos')->default(null)->cascadeOnDelete();
        });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pcs', function (Blueprint $table) {
            $table->dropForeign(['so_id']);
            $table->dropColumn('so_id');
        });
    }
};
