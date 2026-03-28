<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'first_name')) {
                $table->string('first_name')->nullable()->after('id');
            }

            if (! Schema::hasColumn('users', 'last_name')) {
                $table->string('last_name')->nullable()->after('first_name');
            }

            if (! Schema::hasColumn('users', 'password_hash')) {
                $table->string('password_hash')->nullable()->after('email');
            }
        });

        if (Schema::hasColumn('users', 'name')) {
            DB::table('users')
                ->select('id', 'name')
                ->orderBy('id')
                ->get()
                ->each(function ($user): void {
                    $parts = preg_split('/\s+/', trim((string) $user->name), 2) ?: [];

                    DB::table('users')
                        ->where('id', $user->id)
                        ->update([
                            'first_name' => $parts[0] ?? 'Unknown',
                            'last_name' => $parts[1] ?? 'User',
                        ]);
                });
        }

        if (Schema::hasColumn('users', 'password') && Schema::hasColumn('users', 'password_hash')) {
            DB::table('users')
                ->whereNull('password_hash')
                ->update([
                    'password_hash' => DB::raw('password'),
                ]);
        }

        Schema::table('users', function (Blueprint $table) {
            $columnsToDrop = array_values(array_filter([
                Schema::hasColumn('users', 'name') ? 'name' : null,
                Schema::hasColumn('users', 'email_verified_at') ? 'email_verified_at' : null,
                Schema::hasColumn('users', 'password') ? 'password' : null,
                Schema::hasColumn('users', 'remember_token') ? 'remember_token' : null,
                Schema::hasColumn('users', 'created_at') ? 'created_at' : null,
                Schema::hasColumn('users', 'updated_at') ? 'updated_at' : null,
            ]));

            if ($columnsToDrop !== []) {
                $table->dropColumn($columnsToDrop);
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'name')) {
                $table->string('name')->nullable()->after('id');
            }

            if (! Schema::hasColumn('users', 'password')) {
                $table->string('password')->nullable()->after('email');
            }

            if (! Schema::hasColumn('users', 'email_verified_at')) {
                $table->timestamp('email_verified_at')->nullable()->after('email');
            }

            if (! Schema::hasColumn('users', 'remember_token')) {
                $table->rememberToken();
            }

            if (! Schema::hasColumn('users', 'created_at') && ! Schema::hasColumn('users', 'updated_at')) {
                $table->timestamps();
            }
        });

        Schema::table('users', function (Blueprint $table) {
            $columnsToDrop = array_values(array_filter([
                Schema::hasColumn('users', 'first_name') ? 'first_name' : null,
                Schema::hasColumn('users', 'last_name') ? 'last_name' : null,
                Schema::hasColumn('users', 'password_hash') ? 'password_hash' : null,
            ]));

            if ($columnsToDrop !== []) {
                $table->dropColumn($columnsToDrop);
            }
        });
    }
};
