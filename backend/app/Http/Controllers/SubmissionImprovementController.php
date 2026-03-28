<?php

namespace App\Http\Controllers;

use App\Models\SubmissionImprovement;
use Illuminate\Http\Request;

class SubmissionImprovementController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement submission improvement listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement submission improvement creation here.'], 201);
    }

    public function show(SubmissionImprovement $submissionImprovement)
    {
        return response()->json([
            'message' => 'Implement submission improvement retrieval here.',
            'data' => $submissionImprovement,
        ]);
    }

    public function update(Request $request, SubmissionImprovement $submissionImprovement)
    {
        return response()->json([
            'message' => 'Implement submission improvement update here.',
            'data' => $submissionImprovement,
        ]);
    }

    public function destroy(SubmissionImprovement $submissionImprovement)
    {
        return response()->json([
            'message' => 'Implement submission improvement deletion here.',
            'data' => $submissionImprovement,
        ]);
    }
}
