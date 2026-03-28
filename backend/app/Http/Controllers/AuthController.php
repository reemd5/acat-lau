<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'role' => 'required|string',
        ]);



        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        //check if user has this role
        $role = $user->roles()->where('role_name', $request->role)->first();
        if (!$role) {
            return response()->json([
                'message' => 'Unauthorized role'
            ], 403);
        }



        // Create a token (optional: include a role in token name)
        $token = $user->createToken("api-token")->plainTextToken;

        return response()->json([
                'user' => [
                    ...$user->toArray(),
                    'role' => Array($role->role_name),
                ],
                'token' => $token,
        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
