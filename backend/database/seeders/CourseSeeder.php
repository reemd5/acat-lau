<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            ['course_code' => 'CSC310', 'course_name' => 'Algorithms and Data Structures', 'department_id' => 1],
            ['course_code' => 'CSC380', 'course_name' => 'Theory of Computation', 'department_id' => 1],
            ['course_code' => 'CSC447', 'course_name' => 'Parallel Programming for Multicore and Cluster Systems', 'department_id' => 1],
            ['course_code' => 'CSC322', 'course_name' => 'Computer Organization Lab', 'department_id' => 1],
            ['course_code' => 'CSC430', 'course_name' => 'Computer Networks', 'department_id' => 1],
            ['course_code' => 'CSC375', 'course_name' => 'Database Management Systems', 'department_id' => 1],
            ['course_code' => 'CSC490', 'course_name' => 'Software Engineering', 'department_id' => 1],
            ['course_code' => 'CSC599', 'course_name' => 'Capstone Project', 'department_id' => 1],
            ['course_code' => 'CSC598', 'course_name' => 'Undergraduate Research in Computer Science', 'department_id' => 1],
            ['course_code' => 'MTH207', 'course_name' => 'Discrete Structures I', 'department_id' => 1],
            ['course_code' => 'LAS204', 'course_name' => 'Technology, Ethics, and the Global Society', 'department_id' => 2],
        ];

        foreach ($courses as $course) {
            Course::updateOrCreate(
                ['course_code' => $course['course_code']],
                $course
            );
        }
    }
}
