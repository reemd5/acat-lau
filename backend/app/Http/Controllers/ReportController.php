<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement report listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement report creation here.'], 201);
    }

    public function show(Report $report)
    {
        return response()->json(['message' => 'Implement report retrieval here.', 'data' => $report]);
    }

    public function update(Request $request, Report $report)
    {
        return response()->json(['message' => 'Implement report update here.', 'data' => $report]);
    }

    public function destroy(Report $report)
    {
        return response()->json(['message' => 'Implement report deletion here.', 'data' => $report]);
    }
}
