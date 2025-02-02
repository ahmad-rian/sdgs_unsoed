<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpertController extends Controller
{
    public function index()
    {
        // Dummy data for experts
        $experts = [
            [
                'id' => 1,
                'name' => 'Dr. John Doe, M.Sc.',
                'position' => 'Lead Researcher',
                'expertise' => 'Sustainable Development',
                'image' => '/images/experts/expert-1.jpg',
                'social' => [
                    'linkedin' => '#',
                    'twitter' => '#',
                    'email' => 'john.doe@unsoed.ac.id'
                ]
            ],
            [
                'id' => 1,
                'name' => 'Dr. John Doe, M.Sc.',
                'position' => 'Lead Researcher',
                'expertise' => 'Sustainable Development',
                'image' => '/images/experts/expert-1.jpg',
                'social' => [
                    'linkedin' => '#',
                    'twitter' => '#',
                    'email' => 'john.doe@unsoed.ac.id'
                ]
            ],
            [
                'id' => 1,
                'name' => 'Dr. John Doe, M.Sc.',
                'position' => 'Lead Researcher',
                'expertise' => 'Sustainable Development',
                'image' => '/images/experts/expert-1.jpg',
                'social' => [
                    'linkedin' => '#',
                    'twitter' => '#',
                    'email' => 'john.doe@unsoed.ac.id'
                ]
            ],
            [
                'id' => 1,
                'name' => 'Dr. John Doe, M.Sc.',
                'position' => 'Lead Researcher',
                'expertise' => 'Sustainable Development',
                'image' => '/images/experts/expert-1.jpg',
                'social' => [
                    'linkedin' => '#',
                    'twitter' => '#',
                    'email' => 'john.doe@unsoed.ac.id'
                ]
            ],
            [
                'id' => 1,
                'name' => 'Dr. John Doe, M.Sc.',
                'position' => 'Lead Researcher',
                'expertise' => 'Sustainable Development',
                'image' => '/images/experts/expert-1.jpg',
                'social' => [
                    'linkedin' => '#',
                    'twitter' => '#',
                    'email' => 'john.doe@unsoed.ac.id'
                ]
            ],
            // Add more experts...
        ];

        return Inertia::render('Expert/Index', [
            'experts' => $experts
        ]);
    }
}
