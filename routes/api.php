<?php

use App\Http\Controllers\Api\V1\CardController;
use App\Http\Controllers\Api\V1\DeskController;
use App\Http\Controllers\Api\V1\DeskListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'desks' => DeskController::class,
    'desk_lists' => DeskListController::class,
    'cards' => CardController::class,
]);
