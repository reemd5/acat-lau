<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
       try{
            $courses = Course::with('sos')->get();
            return response()->json($courses);
       } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving courses.', 'error' => $e->getMessage()], 500);
       }
    }

    public function store(Request $request)
    {
        try {
            $validate = $request->validate([
                'course_code' => 'required|string|unique:courses,course_code',
                'course_name' => 'required|string',
                'so_ids' => 'array',
                'so_ids.*' => 'integer|exists:sos,id'
            ]);

            //set department_id
            $validate["department_id"] = 1;
            $course = Course::create($validate);


            // Attach SO associations if provided
            if (isset($validate['so_ids'])) {
                $course->sos()->attach($validate['so_ids']);
            }

            return response()->json(['message' => 'Course created successfully.', 'data' => $course], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating course.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(Course $course)
    {
        return response()->json(['message' => 'Implement course retrieval here.', 'data' => $course]);
    }

    public function update(Request $request, Course $course)
    {
        try{
            $validate = $request->validate([
                'course_code' => 'string',
                'course_name' => 'string',
                'department_id' => 'integer|exists:departments,id',
                'so_ids' => 'array',
                'so_ids.*' => 'integer|exists:sos,id'
            ]);
            
            $course->update($validate);

            // Update SO associations if provided
            if (isset($validate['so_ids'])) {
                $course->sos()->sync($validate['so_ids']);
            }


            return response()->json(['message' => 'Course updated successfully.', 'data' => $course]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating course.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Course $course)
    {
        try{
            $course->delete();

            return response()->json(['message' => 'Course deleted successfully.', 'data' => $course]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting course.', 'error' => $e->getMessage()], 500);
        }
    }
}
