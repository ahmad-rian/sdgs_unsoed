<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AllowedEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Inertia\Inertia;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        // Tambahkan stateless untuk menghindari masalah session
        // Simpan URL redirect di .env
        $redirectUrl = config('services.google.redirect');
        Log::info('Redirect URL yang digunakan', ['url' => $redirectUrl]);

        return Socialite::driver('google')
            ->stateless()
            ->redirectUrl($redirectUrl)
            ->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            Log::info('Memulai Google callback');
            Log::info('Parameters yang diterima:', $request->all());

            // Cek apakah parameter code ada
            if (!$request->has('code')) {
                Log::error('Parameter code tidak ditemukan dalam request');
                return redirect()->route('login')
                    ->with('status', 'Terjadi kesalahan: Parameter otorisasi tidak ditemukan');
            }

            // Gunakan URL redirect yang sama dengan yang digunakan di redirectToGoogle
            $redirectUrl = config('services.google.redirect');
            Log::info('Callback URL yang digunakan', ['url' => $redirectUrl]);

            // Dapatkan data user dari Google
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->redirectUrl($redirectUrl)
                ->user();

            Log::info('Data user dari Google', ['email' => $googleUser->email, 'name' => $googleUser->name]);

            // Periksa email dalam database
            $email = $googleUser->email;
            $dbEmails = AllowedEmail::pluck('email')->toArray();
            $isAllowed = in_array($email, $dbEmails);

            Log::info('Pengecekan email', [
                'email' => $email,
                'isAllowed' => $isAllowed,
                'allowed_emails_in_db' => $dbEmails
            ]);

            if (!$isAllowed) {
                Log::warning('Email tidak diizinkan', ['email' => $email]);
                return redirect()->route('login')
                    ->with('status', 'Email tidak diizinkan untuk login.');
            }

            // Cari user berdasarkan email saja untuk menghindari masalah
            $user = User::where('email', $email)->first();

            Log::info('Pencarian user', [
                'found' => (bool)$user,
                'user_id' => $user ? $user->id : null
            ]);

            // Jika user belum ada, buat user baru
            if (!$user) {
                Log::info('Membuat user baru');
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $email,
                    'google_id' => $googleUser->id,
                    'email_verified_at' => now()
                ]);
                Log::info('User baru dibuat', ['user_id' => $user->id]);
            } else {
                // Update google_id jika user ditemukan
                Log::info('Update user yang sudah ada');
                $user->update([
                    'google_id' => $googleUser->id,
                    'email_verified_at' => now()
                ]);
                Log::info('User diupdate', ['user_id' => $user->id]);
            }

            // Login
            Auth::login($user);
            Log::info('User berhasil login', ['user_id' => $user->id]);

            // Redirect ke dashboard
            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            Log::error('Error dalam Google callback', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->route('login')
                ->with('status', 'Terjadi kesalahan saat login: ' . $e->getMessage());
        }
    }
}
