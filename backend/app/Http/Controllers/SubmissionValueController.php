<?php

namespace App\Http\Controllers;

use App\Models\SubmissionValue;
use Illuminate\Http\Request;

class SubmissionValueController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement submission value listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement submission value creation here.'], 201);
    }

    public function show(SubmissionValue $submissionValue)
    {
        return response()->json(['message' => 'Implement submission value retrieval here.', 'data' => $submissionValue]);
    }

    public function update(Request $request, SubmissionValue $submissionValue)
    {
        return response()->json(['message' => 'Implement submission value update here.', 'data' => $submissionValue]);
    }

    public function destroy(SubmissionValue $submissionValue)
    {
        return response()->json(['message' => 'Implement submission value deletion here.', 'data' => $submissionValue]);
    }
}
