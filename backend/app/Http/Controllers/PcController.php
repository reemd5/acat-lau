<?php

namespace App\Http\Controllers;

use App\Models\Pc;
use Illuminate\Http\Request;

class PcController extends Controller
{
    public function index(Request $request)
    {
        $query = Pc::query();

        if ($request->filled('so_id')) {
            $query->where('so_id', $request->so_id);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement PC creation here.'], 201);
    }

    public function show(Pc $pc)
    {
        return response()->json(['message' => 'Implement PC retrieval here.', 'data' => $pc]);
    }

    public function update(Request $request, Pc $pc)
    {
        return response()->json(['message' => 'Implement PC update here.', 'data' => $pc]);
    }

    public function destroy(Pc $pc)
    {
        return response()->json(['message' => 'Implement PC deletion here.', 'data' => $pc]);
    }
}
