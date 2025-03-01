<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaController extends Controller
{
    /**
     * Display a listing of articles for end users.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Get articles for public view
        $articles = Article::whereNull('deleted_at')
            ->latest()
            ->paginate(9);

        // Get featured article (could be based on some criteria like most viewed)
        $featured_article = Article::whereNull('deleted_at')
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('Media/ArticleIndex', [
            'articles' => $articles,
            'featured_article' => $featured_article
        ]);
    }

    /**
     * Display the specified article.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        // Find the article
        $article = Article::findOrFail($id);

        // Get related articles (for example, take 3 recent articles except current one)
        $related_articles = Article::whereNull('deleted_at')
            ->where('id', '!=', $article->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Media/ArticleShow', [
            'article' => $article,
            'related_articles' => $related_articles
        ]);
    }
}
