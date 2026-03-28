<?php

namespace App\Http\Controllers;

use App\Models\So;
use Illuminate\Http\Request;

class SoController extends Controller
{
    public function index()
    {
        $sos = So::all();
        
        return response()->json($sos);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement SO creation here.'], 201);
    }

    public function show(So $so)
    {
        return response()->json(['message' => 'Implement SO retrieval here.', 'data' => $so]);
    }

    public function update(Request $request, So $so)
    {
        return response()->json(['message' => 'Implement SO update here.', 'data' => $so]);
    }

    public function destroy(So $so)
    {
        return response()->json(['message' => 'Implement SO deletion here.', 'data' => $so]);
    }
}
