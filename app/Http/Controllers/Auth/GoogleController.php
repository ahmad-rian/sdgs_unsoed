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
        try {
            // Dapatkan redirect URL dari konfigurasi
            $redirectUrl = config('services.google.redirect');

            // Log informasi untuk debugging
            Log::info('Google OAuth redirect dimulai', [
                'redirect_url' => $redirectUrl,
                'app_url' => config('app.url')
            ]);

            // Gunakan URL redirect eksplisit dan mode stateless
            return Socialite::driver('google')
                ->stateless()
                ->redirectUrl($redirectUrl)
                ->with(['prompt' => 'select_account'])
                ->scopes(['openid', 'profile', 'email'])
                ->redirect();
        } catch (\Exception $e) {
            Log::error('Error saat redirect ke Google', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->route('login')
                ->with('status', 'Terjadi kesalahan saat menghubungkan ke Google: ' . $e->getMessage());
        }
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            Log::info('Google callback dimulai', [
                'query_params' => $request->all(),
                'has_code' => $request->has('code'),
                'has_error' => $request->has('error')
            ]);

            // Periksa apakah ada kesalahan dalam response
            if ($request->has('error')) {
                Log::error('OAuth error dalam callback', [
                    'error' => $request->get('error'),
                    'error_description' => $request->get('error_description')
                ]);

                return redirect()->route('login')
                    ->with('status', 'Autentikasi Google gagal: ' . $request->get('error_description', 'Unknown error'));
            }

            // Periksa jika parameter code tidak ada
            if (!$request->has('code')) {
                Log::error('Parameter kode tidak ditemukan dalam callback');
                return redirect()->route('login')
                    ->with('status', 'Parameter otorisasi tidak ditemukan');
            }

            // Gunakan URL redirect yang sama
            $redirectUrl = config('services.google.redirect');

            // Dapatkan data user dari Google dengan URL redirect yang sama
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->redirectUrl($redirectUrl)
                ->user();

            Log::info('Data user dari Google berhasil diambil', [
                'email' => $googleUser->email,
                'name' => $googleUser->name
            ]);

            // Proses lainnya sama seperti sebelumnya
            $email = $googleUser->email;
            $dbEmails = AllowedEmail::pluck('email')->toArray();
            $isAllowed = in_array($email, $dbEmails);

            if (!$isAllowed) {
                Log::warning('Email tidak diizinkan', ['email' => $email]);
                return redirect()->route('login')
                    ->with('status', 'Email tidak diizinkan untuk login.');
            }

            $user = User::where('email', $email)->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $email,
                    'google_id' => $googleUser->id,
                    'email_verified_at' => now()
                ]);
            } else {
                $user->update([
                    'google_id' => $googleUser->id,
                    'email_verified_at' => now()
                ]);
            }

            Auth::login($user);
            Log::info('User berhasil login', ['user_id' => $user->id]);

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
