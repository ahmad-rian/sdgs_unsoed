<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ResearchController extends Controller
{
    public function mapping()
    {
        return Inertia::render('Research/Mapping');
    }
}
