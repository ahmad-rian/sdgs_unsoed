<?php

namespace Database\Seeders;

use App\Models\AllowedEmail;
use Illuminate\Database\Seeder;

class AllowedEmailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $emails = [
            "alriansr@gmail.com",
            "ahmad.ritonga@mhs.unsoed.ac.id"
        ];

        foreach ($emails as $email) {
            AllowedEmail::create(['email' => $email]);
        }
    }
}
