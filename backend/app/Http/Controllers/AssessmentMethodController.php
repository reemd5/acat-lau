<?php

namespace App\Http\Controllers;

use App\Models\AssessmentMethod;
use Illuminate\Http\Request;

class AssessmentMethodController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement assessment method listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement assessment method creation here.'], 201);
    }

    public function show(AssessmentMethod $assessmentMethod)
    {
        return response()->json(['message' => 'Implement assessment method retrieval here.', 'data' => $assessmentMethod]);
    }

    public function update(Request $request, AssessmentMethod $assessmentMethod)
    {
        return response()->json(['message' => 'Implement assessment method update here.', 'data' => $assessmentMethod]);
    }

    public function destroy(AssessmentMethod $assessmentMethod)
    {
        return response()->json(['message' => 'Implement assessment method deletion here.', 'data' => $assessmentMethod]);
    }
}
