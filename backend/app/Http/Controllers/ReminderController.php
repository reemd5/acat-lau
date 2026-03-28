<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use Illuminate\Http\Request;

class ReminderController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement reminder listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement reminder creation here.'], 201);
    }

    public function show(Reminder $reminder)
    {
        return response()->json(['message' => 'Implement reminder retrieval here.', 'data' => $reminder]);
    }

    public function update(Request $request, Reminder $reminder)
    {
        return response()->json(['message' => 'Implement reminder update here.', 'data' => $reminder]);
    }

    public function destroy(Reminder $reminder)
    {
        return response()->json(['message' => 'Implement reminder deletion here.', 'data' => $reminder]);
    }
}
