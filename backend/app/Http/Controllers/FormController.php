<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Implement form listing here.']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Implement form creation here.'], 201);
    }

    public function show(Form $form)
    {
        return response()->json(['message' => 'Implement form retrieval here.', 'data' => $form]);
    }

    public function update(Request $request, Form $form)
    {
        return response()->json(['message' => 'Implement form update here.', 'data' => $form]);
    }

    public function destroy(Form $form)
    {
        return response()->json(['message' => 'Implement form deletion here.', 'data' => $form]);
    }
}
