<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        try {
            $setting = Setting::first();
            $setting->year_number = (int) $setting->current_year_number;
            
            if (!$setting) {
                return response()->json(['message' => 'No settings found.'], 404);
            }
            
            return response()->json($setting);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving settings.', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'academic_year' => 'required|string',
            'current_semester' => 'required|string',
            'semester_start_date' => 'required|date',
            'semester_end_date' => 'required|date|after:semester_start_date',
            'year_number' => 'required|integer',
        ]);

        $validated['current_year_number'] = (int) $validated['year_number'];
        unset($validated['year_number']);

        $setting = Setting::updateOrCreate($validated);
        return response()->json(['message' => 'Settings saved successfully.', 'data' => $setting], 201);
    }

    public function show(Setting $setting)
    {
        return response()->json(['message' => 'Implement settings retrieval here.', 'data' => $setting]);
    }

    public function update(Request $request, Setting $setting)
    {
        return response()->json(['message' => 'Implement settings update here.', 'data' => $setting]);
    }

    public function destroy(Setting $setting)
    {
        return response()->json(['message' => 'Implement settings deletion here.', 'data' => $setting]);
    }
}
