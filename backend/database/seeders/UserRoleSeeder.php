<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserRoleSeeder extends Seeder
{
    public function run(): void
    {
        // Example: Assign roles to users by email
        $userRoles = [
            'developer@acat.com' => ['admin', 'coordinator'],
            'john.doe@example.com' => ['instructor'],
            'bill.smith@gmail.com' => ['admin'],
        ];

        foreach ($userRoles as $email => $roles) {
            $user = User::where('email', $email)->first();
            if ($user) {
                // Attach roles, avoid duplicates
                $roleIds = Role::whereIn('role_name', $roles)->pluck('id')->toArray();
                $user->roles()->sync($roleIds); // sync replaces existing roles
            }
        }
    }
}