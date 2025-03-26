<?php

namespace App\Http\Middleware;

use App\Models\AllowedEmail;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AllowedEmailMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();
            $isAllowed = AllowedEmail::where('email', $user->email)->exists();

            if (!$isAllowed) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()->route('login')
                    ->with('status', 'Email tidak diizinkan untuk mengakses sistem.');
            }
        }

        return $next($request);
    }
}
