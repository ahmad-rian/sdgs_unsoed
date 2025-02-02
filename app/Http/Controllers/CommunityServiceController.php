<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Community/Index');
    }
}
