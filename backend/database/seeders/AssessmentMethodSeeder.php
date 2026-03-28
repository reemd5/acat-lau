<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssessmentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            ['id' => 1, 'method_name' => 'Exit Survey'],
            ['id' => 2, 'method_name' => 'Stakeholder Survey'],
            ['id' => 3, 'method_name' => 'Advisory Council Meeting'],
            ['id' => 4, 'method_name' => 'Embedded Assessment'],
            ['id' => 5, 'method_name' => 'Student Focus Group Meeting'],
            ['id' => 6, 'method_name' => 'Scoring Rubrics'],
        ];

        foreach ($methods as $method) {
            DB::table('assessment_methods')->updateOrInsert(
                ['id' => $method['id']],
                ['method_name' => $method['method_name']]
            );
        }
    }
}
