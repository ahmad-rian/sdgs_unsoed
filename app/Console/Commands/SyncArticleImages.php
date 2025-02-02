<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class SyncArticleImages extends Command
{
    protected $signature = 'articles:sync-images';
    protected $description = 'Synchronize article images with database records';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('Starting synchronization...');

        $articles = Article::withTrashed()->get();
        $count = 0;
        $errors = 0;

        foreach ($articles as $article) {
            try {
                if ($article->image && !Storage::disk('public')->exists($article->image)) {
                    $article->delete();
                    $count++;
                    $this->info("Cleaned up record for article ID: {$article->id}");
                }
            } catch (\Exception $e) {
                $errors++;
                $this->error("Error processing article ID {$article->id}: {$e->getMessage()}");
            }
        }

        $this->info("Synchronization completed:");
        $this->info("- Processed articles: " . $articles->count());
        $this->info("- Cleaned records: $count");
        $this->info("- Errors encountered: $errors");
    }
}
