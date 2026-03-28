<?php

namespace Database\Seeders;

use App\Models\Campus;
use Illuminate\Database\Seeder;

class CampusSeeder extends Seeder
{
    public function run(): void
    {
        $campuses = [
            ['campus_name' => 'Beirut'],
            ['campus_name' => 'Byblos'],
        ];

        foreach ($campuses as $campus) {
            Campus::updateOrCreate(
                ['campus_name' => $campus['campus_name']],
                $campus
            );
        }
    }
}
