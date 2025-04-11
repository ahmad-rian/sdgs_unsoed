<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- SEO Meta Tags -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description"
        content="SDGs Center Unsoed - Integrating Sustainable Development Goals beyond boundaries at Universitas Jenderal Soedirman">
    <meta name="keywords"
        content="SDGs, Sustainable Development Goals, Unsoed, Universitas Jenderal Soedirman, sustainability, research, education, community">
    <meta name="author" content="SDGs Center Unsoed">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="SDGs Center - Universitas Jenderal Soedirman">
    <meta property="og:description"
        content="SDGs Center Unsoed - Integrating Sustainable Development Goals beyond boundaries at Universitas Jenderal Soedirman">
    <meta property="og:image" content="{{ asset('assets/sdg2.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="SDGs Center - Universitas Jenderal Soedirman">
    <meta property="twitter:description"
        content="SDGs Center Unsoed - Integrating Sustainable Development Goals beyond boundaries at Universitas Jenderal Soedirman">
    <meta property="twitter:image" content="{{ asset('assets/sdg2.png') }}">

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('favicon.ico') }}">
    <link rel="apple-touch-icon" href="{{ asset('assets/sdg2.png') }}">

    <!-- Title handled by Inertia -->
    <title inertia>{{ config('app.name', 'SDGs Center UNSOED') }}</title>

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    {{-- <link rel="preload" href="/fonts/Altone Trial-Regular.ttf" as="font" type="font/ttf" crossorigin> --}}

    <!-- Structured Data for Organization -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "SDGs Center Universitas Jenderal Soedirman",
      "url": "{{ url('/') }}",
      "logo": "{{ asset('assets/sdg2.png') }}",
      "description": "SDGs Center Unsoed - Integrating Sustainable Development Goals beyond boundaries at Universitas Jenderal Soedirman",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ID"
      }
    }
    </script>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
