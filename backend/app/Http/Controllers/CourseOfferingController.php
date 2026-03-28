<?php

namespace App\Http\Controllers;

use App\Models\CourseOffering;
use Illuminate\Http\Request;

class CourseOfferingController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement course offering listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement course offering creation here.'], 201);
    }

    public function show(CourseOffering $courseOffering)
    {
        return response()->json(['message' => 'Implement course offering retrieval here.', 'data' => $courseOffering]);
    }

    public function update(Request $request, CourseOffering $courseOffering)
    {
        return response()->json(['message' => 'Implement course offering update here.', 'data' => $courseOffering]);
    }

    public function destroy(CourseOffering $courseOffering)
    {
        return response()->json(['message' => 'Implement course offering deletion here.', 'data' => $courseOffering]);
    }
}
