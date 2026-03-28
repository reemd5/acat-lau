<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DepartmentSeeder::class,
            CampusSeeder::class,
            RoleSeeder::class,
            SoSeeder::class,
            AssessmentMethodSeeder::class,
            PcSeeder::class,
            CourseSeeder::class,
            UserSeeder::class,
            UserRoleSeeder::class,
        ]);
    }
}
