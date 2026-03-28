<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement submission listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement submission creation here.'], 201);
    }

    public function show(Submission $submission)
    {
        return response()->json(['message' => 'Implement submission retrieval here.', 'data' => $submission]);
    }

    public function update(Request $request, Submission $submission)
    {
        return response()->json(['message' => 'Implement submission update here.', 'data' => $submission]);
    }

    public function destroy(Submission $submission)
    {
        return response()->json(['message' => 'Implement submission deletion here.', 'data' => $submission]);
    }
}
