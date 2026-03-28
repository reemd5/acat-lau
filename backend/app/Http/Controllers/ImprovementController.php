<?php

namespace App\Http\Controllers;

use App\Models\Improvement;
use Illuminate\Http\Request;

class ImprovementController extends Controller
{
    public function index()
    {
        return Improvement::all();
    }

    public function show($id)
    {
        return Improvement::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'nullable|exists:courses,course_id',
            'slo_id' => 'nullable|exists:slos,so_id',
            'description' => 'nullable|string',
            'status' => 'nullable|in:PROPOSED,APPROVED,IMPLEMENTED',
            'year' => 'nullable|integer'
        ]);

        return Improvement::create($validated);
    }

    public function update(Request $request, $id)
    {
        $improvement = Improvement::findOrFail($id);

        $validated = $request->validate([
            'course_id' => 'sometimes|exists:courses,course_id',
            'slo_id' => 'sometimes|exists:slos,so_id',
            'description' => 'sometimes|string',
            'status' => 'sometimes|in:PROPOSED,APPROVED,IMPLEMENTED',
            'year' => 'sometimes|integer'
        ]);

        $improvement->update($validated);

        return $improvement;
    }

    public function destroy($id)
    {
        Improvement::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}