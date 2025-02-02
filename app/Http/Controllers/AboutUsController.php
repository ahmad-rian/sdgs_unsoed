<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    /**
     * Display the SDGs page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('About/Us');
    }
}
