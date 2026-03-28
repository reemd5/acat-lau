<?php

namespace App\Http\Controllers;

use App\Models\FormAssignment;
use Illuminate\Http\Request;

class FormAssignmentController extends Controller
{
    public function index(Request $request)
    {
        try {

            $queryParams = $request->query();

            $query = FormAssignment::query();

            //filter by so_id if provided
            if (isset($queryParams['so_id'])) {
                $query->where('so_id', $queryParams['so_id']);
            }

            //filter by course_id if provided
            if (isset($queryParams['course_id'])) {
                $query->where('course_id', $queryParams['course_id']);
            }

            $formAssignments = $query->get();

            return response()->json($formAssignments);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving form assignments.', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement form assignment creation here.'], 201);
    }

    public function show(FormAssignment $formAssignment)
    {
        return response()->json(['message' => 'Implement form assignment retrieval here.', 'data' => $formAssignment]);
    }

    public function update(Request $request, FormAssignment $formAssignment)
    {
        return response()->json(['message' => 'Implement form assignment update here.', 'data' => $formAssignment]);
    }

    public function destroy(FormAssignment $formAssignment)
    {
        return response()->json(['message' => 'Implement form assignment deletion here.', 'data' => $formAssignment]);
    }
}
