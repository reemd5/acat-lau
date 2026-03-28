<?php

namespace App\Http\Controllers;

use App\Models\Campus;
use Illuminate\Http\Request;

class CampusController extends Controller
{
    public function index()
    {
        $campuses = Campus::all();

        return response()->json($campuses);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement campus creation here.'], 201);
    }

    public function show(Campus $campus)
    {
        return response()->json(['message' => 'Implement campus retrieval here.', 'data' => $campus]);
    }

    public function update(Request $request, Campus $campus)
    {
        return response()->json(['message' => 'Implement campus update here.', 'data' => $campus]);
    }

    public function destroy(Campus $campus)
    {
        return response()->json(['message' => 'Implement campus deletion here.', 'data' => $campus]);
    }
}
