<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement role listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement role creation here.'], 201);
    }

    public function show(Role $role)
    {
        return response()->json(['message' => 'Implement role retrieval here.', 'data' => $role]);
    }

    public function update(Request $request, Role $role)
    {
        return response()->json(['message' => 'Implement role update here.', 'data' => $role]);
    }

    public function destroy(Role $role)
    {
        return response()->json(['message' => 'Implement role deletion here.', 'data' => $role]);
    }
}
