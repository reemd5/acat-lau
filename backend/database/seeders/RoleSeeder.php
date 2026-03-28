<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['role_name' => 'super_admin'],
            ['role_name' => 'admin'],
            ['role_name' => 'instructor'],
            ['role_name' => 'coordinator'],
            
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['role_name' => $role['role_name']],
                $role
            );
        }
    }
}
