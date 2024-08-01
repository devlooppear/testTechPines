<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AlbumController extends Controller
{
    protected $model = 'Album';

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $albums = Album::with(['tracks', 'artist'])->get();
            return response()->json(['data' => $albums, 'message' => 'Albums retrieved successfully'], 200);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to retrieve albums'], 500);
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
                'artist_id' => 'nullable|integer|exists:artists,id',
                'release_year' => 'nullable|integer',
                'label' => 'nullable|string|max:255',
                'track_ids' => 'nullable|array|exists:tracks,id',
            ]);

            $validatedData['artist_id'] = $validatedData['artist_id'] ?? 1;

            $album = Album::create($validatedData);

            if (isset($validatedData['track_ids'])) {
                $album->tracks()->sync($validatedData['track_ids']);
            }

            return response()->json(['data' => $album->load(['tracks', 'artist']), 'message' => 'Album created successfully'], 201);
        } catch (ValidationException $e) {
            Log::error('Validation error in ' . $this->model . ': ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to create album'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Album $album)
    {
        try {
            $album->load(['tracks', 'artist']);
            return response()->json(['data' => $album, 'message' => 'Album retrieved successfully'], 200);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to retrieve album'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Album $album)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'nullable|string|max:255',
                'artist_id' => 'nullable|integer|exists:artists,id',
                'release_year' => 'nullable|integer',
                'label' => 'nullable|string|max:255',
                'track_ids' => 'nullable|array|exists:tracks,id',
            ]);

            $album->update($validatedData);

            if (isset($validatedData['track_ids'])) {
                $album->tracks()->sync($validatedData['track_ids']);
            }

            return response()->json(['data' => $album->load(['tracks', 'artist']), 'message' => 'Album updated successfully'], 200);
        } catch (ValidationException $e) {
            Log::error('Validation error in ' . $this->model . ': ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to update album'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Album $album)
    {
        try {
            $album->delete();
            return response()->json(['data' => null, 'message' => 'Album deleted successfully'], 204);
        } catch (Exception $e) {
            Log::error('An error in ' . $this->model . ' occurred: ' . $e->getMessage());
            return response()->json(['data' => null, 'message' => 'Failed to delete album'], 500);
        }
    }
}
