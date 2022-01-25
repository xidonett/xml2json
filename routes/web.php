<?php

use App\Http\Controllers\ConverterController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::controller(ConverterController::class)->group(function () {
    Route::post('/api/get-xml', 'getXML')->name('api.get-xml');
    Route::post('/api/get-json', 'getJSON')->name('api.get-json');
    Route::post('/api/download', 'download')->name('api.download');
});
