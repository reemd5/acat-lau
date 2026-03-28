<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['department_name' => 'Computer Science and Mathematics'],
            ['department_name' => 'Liberal Arts and Sciences'],
        ];

        foreach ($departments as $department) {
            Department::updateOrCreate(
                ['department_name' => $department['department_name']],
                $department
            );
        }
    }
}
