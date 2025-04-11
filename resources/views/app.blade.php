<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- SEO Meta Tags -->
    <meta name="description"
        content="SDGs Center Unsoed - Mengintegrasikan Tujuan Pembangunan Berkelanjutan di Universitas Jenderal Soedirman dan melampaui batasannya">
    <meta name="keywords"
        content="SDGs, Tujuan Pembangunan Berkelanjutan, Unsoed, Universitas Jenderal Soedirman, keberlanjutan, penelitian, pendidikan, pengabdian masyarakat">
    <meta name="author" content="SDGs Center Unsoed">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="{{ config('app.name', 'SDGs Center UNSOED') }}">
    <meta property="og:description"
        content="SDGs Center Unsoed - Mengintegrasikan Tujuan Pembangunan Berkelanjutan di Universitas Jenderal Soedirman dan melampaui batasannya">
    <meta property="og:image" content="{{ asset('assets/sdg2.png') }}">
    <meta property="og:site_name" content="SDGs Center Unsoed">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ url()->current() }}">
    <meta name="twitter:title" content="{{ config('app.name', 'SDGs Center UNSOED') }}">
    <meta name="twitter:description"
        content="SDGs Center Unsoed - Mengintegrasikan Tujuan Pembangunan Berkelanjutan di Universitas Jenderal Soedirman dan melampaui batasannya">
    <meta name="twitter:image" content="{{ asset('assets/sdg2.png') }}">

    <!-- Favicon dan Logo untuk Google -->
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/sdg2.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('assets/sdg2.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/sdg2.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    <!-- URL Kanonik - Mencegah masalah konten duplikat -->
    <link rel="canonical" href="{{ url()->current() }}" />

    <!-- Data Terstruktur JSON-LD untuk Organisasi dan Logo -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "SDGs Center Universitas Jenderal Soedirman",
        "alternateName": "SDGs Center Unsoed",
        "url": "{{ url('/') }}",
        "logo": "{{ asset('assets/sdg2.png') }}",
        "image": "{{ asset('assets/sdg2.png') }}",
        "description": "SDGs Center Unsoed - Pusat studi dan implementasi Tujuan Pembangunan Berkelanjutan di Universitas Jenderal Soedirman",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jl. Dr. Soeparno",
            "addressLocality": "Purwokerto",
            "addressRegion": "Jawa Tengah",
            "postalCode": "53122",
            "addressCountry": "ID"
        },
        "telephone": "+62-xxx-xxx-xxxx",
        "email": "sdgs@unsoed.ac.id",
        "sameAs": [
            "https://www.facebook.com/sdgsunsoed",
            "https://www.instagram.com/sdgs.unsoed",
            "https://twitter.com/SDGsUnsoed"
        ],
        "parentOrganization": {
            "@type": "EducationalOrganization",
            "name": "Universitas Jenderal Soedirman",
            "url": "https://unsoed.ac.id"
        }
    }
    </script>

    <!-- Data Terstruktur JSON-LD untuk Situs Web -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "{{ url('/') }}",
        "name": "SDGs Center Universitas Jenderal Soedirman",
        "description": "Pusat implementasi dan edukasi Tujuan Pembangunan Berkelanjutan",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "{{ url('/') }}/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>

    <!-- Data Terstruktur JSON-LD untuk Navigasi Situs (BreadcrumbList) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Beranda",
                "item": "{{ url('/') }}"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "{{ isset($title) ? $title : 'Halaman' }}",
                "item": "{{ url()->current() }}"
            }
        ]
    }
    </script>

    <title inertia>{{ config('app.name', 'SDGs Center UNSOED') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    {{-- <link rel="preload" href="/fonts/Altone Trial-Regular.ttf" as="font" type="font/ttf" crossorigin> --}}

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
