<?php

namespace Database\Seeders;

use App\Models\Pc;
use Illuminate\Database\Seeder;

class PcSeeder extends Seeder
{
    public function run(): void
    {
        $pcs = [
            ['so_id' => 1, 'pc_code' => 'PC1.1', 'description' => 'Students shall be able to apply fundamental concepts of discrete mathematics in order to model computational problems.'],
            ['so_id' => 1, 'pc_code' => 'PC1.2', 'description' => 'Students will acquire familiarity with basic classes and properties of formal languages.'],
            ['so_id' => 1, 'pc_code' => 'PC1.3', 'description' => 'Students should be able to mathematically deduce and find a closed-form for simple recurrence relations.'],
            ['so_id' => 1, 'pc_code' => 'PC1.4', 'description' => 'Students will be able to understand and use basic graph theoretic algorithms and technologies.'],
            ['so_id' => 1, 'pc_code' => 'PC1.5', 'description' => 'Students shall demonstrate an understanding of divide and conquer, greedy technique, and dynamic programming technique.'],
            ['so_id' => 1, 'pc_code' => 'PC1.6', 'description' => 'Students will be able to demonstrate an understanding of P, NP, and NP-complete classes and carry out some polynomial-time problem reductions.'],
            ['so_id' => 1, 'pc_code' => 'PC1.7', 'description' => 'Students shall demonstrate an ability to analyze algorithms using asymptotic notations.'],
            ['so_id' => 2, 'pc_code' => 'PC2.1', 'description' => 'Students shall design, analyze, and implement a parallel programming application using manycore and multicore systems.'],
            ['so_id' => 2, 'pc_code' => 'PC2.2', 'description' => 'Students shall demonstrate the ability to design, implement, and simulate, a computer model based on an instruction set given a set of constraints, and to evaluate the system in terms of general quality attributes and possible tradeoffs including Identifying goals and scope, searching for alternatives for achieving outcomes, choosing the best possible solutions, creating a proper computer model, analyzing, test and evaluate the recommended system, and justifying the final design.'],
            ['so_id' => 2, 'pc_code' => 'PC2.3', 'description' => 'Students shall demonstrate the ability to design a practical network under a specified set of constraints, and to evaluate the systems in terms of general quality attributes and possible tradeoffs including Identifying goals and scope, searching for alternatives for achieving outcomes, choosing the best possible solutions, creating a proper computer model, analyzing, test and evaluate the recommended system, and justifying the final design.'],
            ['so_id' => 2, 'pc_code' => 'PC2.4', 'description' => 'Students shall demonstrate the ability to design and implement a database application using an appropriate relational DBMS, including Identifying goals and scope, searching for alternatives for achieving outcomes, choosing the best possible solutions, creating a proper computer model, analyzing, test and evaluate the recommended system, and justifying the final design.'],
            ['so_id' => 3, 'pc_code' => 'PC3.1', 'description' => 'Demonstrate the ability to visually communicate ideas and concepts using graphs and figures.'],
            ['so_id' => 3, 'pc_code' => 'PC3.2', 'description' => 'Submit work with a minimum of errors in spelling, punctuation, grammar, and usage.'],
            ['so_id' => 3, 'pc_code' => 'PC3.3', 'description' => 'Ability to identify reader/audience, assess their previous knowledge and information needs, and organize/design information to meet those needs.'],
            ['so_id' => 3, 'pc_code' => 'PC3.4', 'description' => 'Demonstrate ability to communicate and present information electronically including use of appropriate software and multimedia tools.'],
            ['so_id' => 4, 'pc_code' => 'PC4.1', 'description' => 'Students shall demonstrate knowledge of the ACM and/or IEEE codes of ethics.'],
            ['so_id' => 4, 'pc_code' => 'PC4.2', 'description' => 'Students shall be able to describe and critique at least one scenario related to ethics.'],
            ['so_id' => 4, 'pc_code' => 'PC4.3', 'description' => 'Students shall be able to articulate the ethical tradeoffs in a technical decision.'],
            ['so_id' => 4, 'pc_code' => 'PC4.4', 'description' => 'Students shall be able to understand the impact of computing solutions in a societal context, including understanding national and international patent law, the legal background of copyright in national and international law, and computer-based threats to privacy.'],
            ['so_id' => 5, 'pc_code' => 'PC5.1', 'description' => 'Students shall demonstrate the ability to apply project management principles.'],
            ['so_id' => 5, 'pc_code' => 'PC5.2', 'description' => 'Students shall demonstrate the ability to apply basic principles of group development.'],
            ['so_id' => 5, 'pc_code' => 'PC5.3', 'description' => 'Students shall demonstrate the ability to manage conflicts.'],
            ['so_id' => 6, 'pc_code' => 'PC6.1', 'description' => 'Students shall demonstrate the ability to develop complex software solutions.'],
            ['so_id' => 6, 'pc_code' => 'PC6.2', 'description' => 'Students shall demonstrate the ability to analyze facts and identify appropriate algorithms and data structures to solve computational problems.'],
            ['so_id' => 6, 'pc_code' => 'PC6.3', 'description' => 'Students shall demonstrate the ability to design and implement a software system and identify goals and scope, searching for alternatives for achieving outcomes, choosing the best possible solutions, creating a proper computer model, analyzing, test and evaluate the recommended system, and justifying the final design.'],
        ];

        foreach ($pcs as $pc) {
            Pc::updateOrCreate(
                ['pc_code' => $pc['pc_code']],
                $pc
            );
        }
    }
}
