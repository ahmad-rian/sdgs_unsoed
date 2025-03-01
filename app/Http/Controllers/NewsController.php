<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of news.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Get all berita items and paginate
        $all_news = Berita::where('status', 'published')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->paginate(9);

        // Get featured berita (could be based on views or marked as featured in future)
        $featured_news = Berita::where('status', 'published')
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->first();

        return Inertia::render('News/Index', [
            'all_news' => $all_news,
            'featured_news' => $featured_news
        ]);
    }

    /**
     * Display the specified news.
     *
     * @param  string  $slug
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        // Find the berita by slug
        $news = Berita::where('slug', $slug)
            ->firstOrFail(); // Hilangkan filter status untuk debugging

        // Increment view count
        $news->increment('views');

        // Get related news based on author
        $related_news = Berita::where('id', '!=', $news->id)
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where(function ($query) use ($news) {
                $query->where('author', $news->author);
                // Tambahkan filter berdasarkan keyword jika keywords tidak null
                if (!empty($news->keywords)) {
                    $keywords = explode(',', $news->keywords);
                    foreach ($keywords as $keyword) {
                        $keyword = trim($keyword);
                        if (!empty($keyword)) {
                            $query->orWhere('keywords', 'like', "%{$keyword}%");
                        }
                    }
                }
            })
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('News/Show', [
            'news' => $news,
            'related_news' => $related_news
        ]);
    }
}
