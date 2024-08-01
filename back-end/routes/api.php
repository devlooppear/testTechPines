<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\TrackController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Define API routes for Album resource
Route::apiResource('albums', AlbumController::class);

// Define API routes for Artist resource
Route::apiResource('artists', ArtistController::class);

// Define API routes for Track resource
Route::apiResource('tracks', TrackController::class);
