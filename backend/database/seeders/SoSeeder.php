<?php

namespace Database\Seeders;

use App\Models\So;
use Illuminate\Database\Seeder;

class SoSeeder extends Seeder
{
    public function run(): void
    {
        $sos = [
            [
                'so_code' => 'SO.1',
                'description' => 'Analyze a complex computing problem and apply principles of computing and other relevant disciplines to identify solutions.',
                'is_active' => false,
            ],
            [
                'so_code' => 'SO.2',
                'description' => 'Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program\'s discipline.',
                'is_active' => false,
            ],
            [
                'so_code' => 'SO.3',
                'description' => 'Communicate effectively in a variety of professional contexts.',
                'is_active' => false,
            ],
            [
                'so_code' => 'SO.4',
                'description' => 'Recognize professional responsibilities and make informed judgments in computing practice based on legal and ethical principles.',
                'is_active' => false,
            ],
            [
                'so_code' => 'SO.5',
                'description' => 'Function effectively as a member or leader of a team engaged in activities appropriate to the program\'s discipline.',
                'is_active' => false,
            ],
            [
                'so_code' => 'SO.6',
                'description' => 'Apply computer science theory and software development fundamentals to produce computing-based solutions.',
                'is_active' => false,
            ],
        ];

        foreach ($sos as $so) {
            So::updateOrCreate(
                ['so_code' => $so['so_code']],
                $so
            );
        }
    }
}
