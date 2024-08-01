<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class TrackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tracks = Track::with('albums')->get();
            return response()->json(['data' => $tracks, 'message' => 'Tracks retrieved successfully'], 200);
        } catch (Exception $e) {
            Log::error('An error occurred while retrieving tracks: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to retrieve tracks'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'album_ids' => 'nullable|array',
                'album_ids.*' => 'exists:albums,id',
            ]);

            $track = Track::create([
                'title' => $validatedData['title']
            ]);

            if (isset($validatedData['album_ids'])) {
                $track->albums()->attach($validatedData['album_ids']);
            }

            return response()->json(['data' => $track, 'message' => 'Track created successfully'], 201);
        } catch (ValidationException $e) {
            Log::error('Validation error while creating track: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('An error occurred while creating track: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to create track'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Track $track)
    {
        try {
            $track->load('albums');
            return response()->json(['data' => $track, 'message' => 'Track retrieved successfully'], 200);
        } catch (Exception $e) {
            Log::error('An error occurred while retrieving track: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to retrieve track'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Track $track)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'nullable|string|max:255',
                'album_ids' => 'nullable|array',
                'album_ids.*' => 'exists:albums,id',
            ]);

            $track->update($validatedData);

            if (isset($validatedData['album_ids'])) {
                $track->albums()->sync($validatedData['album_ids']);
            }

            return response()->json(['data' => $track, 'message' => 'Track updated successfully'], 200);
        } catch (ValidationException $e) {
            Log::error('Validation error while updating track: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('An error occurred while updating track: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to update track'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Track $track)
    {
        try {
            $track->albums()->detach();
            $track->delete();
            return response()->json(['data' => null, 'message' => 'Track deleted successfully'], 204);
        } catch (Exception $e) {
            Log::error('An error occurred while deleting track: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to delete track'], 500);
        }
    }
}
