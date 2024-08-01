<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ArtistController extends Controller
{
    protected $model = 'Artist';

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $artists = Artist::all();
            return response()->json(['data' => $artists, 'message' => 'Artists retrieved successfully'], 200);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to retrieve artists'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'genre' => 'nullable|string|max:255',
            ]);

            $artist = Artist::create($validatedData);

            return response()->json(['data' => $artist, 'message' => 'Artist created successfully'], 201);
        } catch (ValidationException $e) {
            Log::error('Validation error in ' . $this->model . ': ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to create artist'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Artist $artist)
    {
        try {
            return response()->json(['data' => $artist, 'message' => 'Artist retrieved successfully'], 200);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to retrieve artist'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Artist $artist)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'nullable|string|max:255',
                'genre' => 'nullable|string|max:255',
            ]);

            $artist->update($validatedData);
            return response()->json(['data' => $artist, 'message' => 'Artist updated successfully'], 200);
        } catch (ValidationException $e) {
            Log::error('Validation error in ' . $this->model . ': ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to update artist'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artist $artist)
    {
        try {
            $artist->delete();
            return response()->json(['data' => null, 'message' => 'Artist deleted successfully'], 204);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to delete artist'], 500);
        }
    }
}
