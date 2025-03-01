<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\AboutSDGSController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\CommunityServiceController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\ExpertController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\MediaController;

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

/*----------------------------------------------------------------------------------*/

Route::get('/about/sdgs', [AboutSDGSController::class, 'index'])->name('about.sdgs');
Route::get('/about/us', [AboutUsController::class, 'index'])->name('about.us');

/*----------------------------------------------------------------------------------*/

Route::get('/research/mapping', [ResearchController::class, 'mapping'])->name('research.mapping');

/*----------------------------------------------------------------------------------*/
Route::get('/education', [EducationController::class, 'index'])->name('education.index');

Route::get('/education/seminar', function () {
    return Inertia::render('Education/Seminar');
})->name('education.seminar');


Route::get('/education/workshop', function () {
    return Inertia::render('Education/Workshop');
})->name('education.workshop');

Route::get('/education/course', function () {
    return Inertia::render('Education/Course');
})->name('education.course');

Route::get('/education/others', function () {
    return Inertia::render('Education/Others');
})->name('education.others');


/*----------------------------------------------------------------------------------*/
Route::get('/community', [CommunityServiceController::class, 'index'])->name('community.index');

Route::get('/service/training', function () {
    return Inertia::render('Community/Training');
})->name('community.training');

Route::get('/service/community', function () {
    return Inertia::render('Community/StudentCommunity');
})->name('community.student');

/*----------------------------------------------------------------------------------*/
Route::get('/publication', [PublicationController::class, 'index'])->name('publication.index');

Route::get('/publication/review', function () {
    return Inertia::render('Publication/CriticalReview');
})->name('publication.review');

Route::get('/publication/journal', function () {
    return Inertia::render('Publication/Journal');
})->name('publication.journal');


/*----------------------------------------------------------------------------------*/

Route::prefix('media')->group(function () {
    Route::get('/news', [NewsController::class, 'index'])->name('news.index');
    Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');

    Route::get('/article', [MediaController::class, 'index'])->name('media.article.index');
    Route::get('/article/{id}', [MediaController::class, 'show'])->name('media.article.show');
});

/*----------------------------------------------------------------------------------*/

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

    Route::resource('berita', BeritaController::class)->parameters([
        'berita' => 'berita'
    ]);
    Route::post('berita/{berita}/restore', [BeritaController::class, 'restore'])->name('berita.restore');
    Route::delete('berita/{berita}/force-delete', [BeritaController::class, 'forceDelete'])->name('berita.force-delete');
});



require __DIR__ . '/auth.php';
