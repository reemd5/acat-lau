<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->text('text');
            $table->foreignId('sender_user_role_id')->constrained('user_roles')->cascadeOnDelete();
            $table->foreignId('recipient_user_role_id')->constrained('user_roles')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};
