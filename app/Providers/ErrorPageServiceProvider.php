<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ErrorPageServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerErrorPages();
    }

    private function registerErrorPages()
    {
        $errorPages = [
            403 => 'Errors/Error403',
            404 => 'Errors/Error404',
            419 => 'Errors/Error419',
            429 => 'Errors/Error429',
            500 => 'Errors/Error500',
            503 => 'Errors/Error503',
        ];

        Route::middleware('web')->group(function () use ($errorPages) {
            foreach ($errorPages as $status => $component) {
                Route::get("/errors/{$status}", function () use ($component) {
                    return Inertia::render($component);
                })->name("errors.{$status}");
            }
        });
    }
}
