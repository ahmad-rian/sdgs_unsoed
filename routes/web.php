<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AboutSDGSController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\CommunityServiceController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\ExpertController;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/about/sdgs', [AboutSDGSController::class, 'index'])->name('about.sdgs');
Route::get('/about/us', [AboutUsController::class, 'index'])->name('about.us');

Route::get('/research/mapping', [ResearchController::class, 'mapping'])->name('research.mapping');
Route::get('/education', [EducationController::class, 'index'])->name('education.index');
Route::get('/community', [CommunityServiceController::class, 'index'])->name('community.index');
Route::get('/publication', [PublicationController::class, 'index'])->name('publication.index');
Route::get('/expert', [ExpertController::class, 'index'])->name('expert.index');


Route::middleware('auth')->group(function () {

    //Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Article Routes
    Route::resource('articles', ArticleController::class);
    Route::delete('articles/{id}/force', [ArticleController::class, 'forceDelete'])
        ->name('articles.force-delete');
    Route::post('articles/{id}/restore', [ArticleController::class, 'restore'])
        ->name('articles.restore');
});



require __DIR__ . '/auth.php';
