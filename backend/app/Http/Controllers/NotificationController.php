<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement notification listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement notification creation here.'], 201);
    }

    public function show(Notification $notification)
    {
        return response()->json(['message' => 'Implement notification retrieval here.', 'data' => $notification]);
    }

    public function update(Request $request, Notification $notification)
    {
        return response()->json(['message' => 'Implement notification update here.', 'data' => $notification]);
    }

    public function destroy(Notification $notification)
    {
        return response()->json(['message' => 'Implement notification deletion here.', 'data' => $notification]);
    }
}
