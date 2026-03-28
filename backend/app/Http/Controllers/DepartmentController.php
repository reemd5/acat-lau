<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement department listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement department creation here.'], 201);
    }

    public function show(Department $department)
    {
        return response()->json(['message' => 'Implement department retrieval here.', 'data' => $department]);
    }

    public function update(Request $request, Department $department)
    {
        return response()->json(['message' => 'Implement department update here.', 'data' => $department]);
    }

    public function destroy(Department $department)
    {
        return response()->json(['message' => 'Implement department deletion here.', 'data' => $department]);
    }
}
