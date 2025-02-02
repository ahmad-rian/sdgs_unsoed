<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {

        $articles = Article::whereNull('deleted_at')
            ->latest()
            ->paginate(10);

        return Inertia::render('Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function create()
    {
        return Inertia::render('Articles/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

        try {
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $originalPath = $image->store('articles/original', 'public');

                $compressedImage = Image::make($image);
                if ($compressedImage->width() > 1200) {
                    $compressedImage->resize(1200, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }

                $compressedPath = 'articles/compressed/' . basename($originalPath);
                Storage::disk('public')->put(
                    $compressedPath,
                    $compressedImage->encode(null, 80)->stream()
                );

                Article::create([
                    'title' => $request->title,
                    'content' => $request->content,
                    'image' => $originalPath,
                    'compressed_image' => $compressedPath
                ]);

                return redirect()->route('articles.index')
                    ->with('message', 'Article created successfully.');
            }
        } catch (\Exception $e) {
            if (isset($originalPath)) {
                Storage::disk('public')->delete($originalPath);
            }
            if (isset($compressedPath)) {
                Storage::disk('public')->delete($compressedPath);
            }

            return redirect()->back()
                ->withInput()
                ->with('error', 'Error creating article: ' . $e->getMessage());
        }
    }

    public function edit(Article $article)
    {
        return Inertia::render('Articles/Edit', [
            'article' => $article
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

        try {
            $data = [
                'title' => $request->title,
                'content' => $request->content,
            ];

            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Store new images first
                $originalPath = $image->store('articles/original', 'public');

                // Create compressed version
                $compressedImage = Image::make($image);

                if ($compressedImage->width() > 1200) {
                    $compressedImage->resize(1200, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }

                $compressedPath = 'articles/compressed/' . basename($originalPath);
                Storage::disk('public')->put(
                    $compressedPath,
                    $compressedImage->encode(null, 80)->stream()
                );

                // Delete old images after successful upload of new ones
                if ($article->image) {
                    Storage::disk('public')->delete($article->image);
                    Storage::disk('public')->delete($article->compressed_image);
                }

                $data['image'] = $originalPath;
                $data['compressed_image'] = $compressedPath;
            }

            $article->update($data);

            return redirect()->route('articles.index')
                ->with('message', 'Article updated successfully.');
        } catch (\Exception $e) {
            // Clean up any new uploaded files if there's an error
            if (isset($originalPath)) {
                Storage::disk('public')->delete($originalPath);
            }
            if (isset($compressedPath)) {
                Storage::disk('public')->delete($compressedPath);
            }

            return redirect()->back()
                ->withInput()
                ->with('error', 'Error updating article: ' . $e->getMessage());
        }
    }

    public function destroy(Article $article)
    {
        try {
            // This will trigger soft delete
            $article->delete();

            // Also clean up the files
            if ($article->image) {
                Storage::disk('public')->delete($article->image);
                Storage::disk('public')->delete($article->compressed_image);
            }

            return redirect()->route('articles.index')
                ->with('message', 'Article deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('articles.index')
                ->with('error', 'Error deleting article: ' . $e->getMessage());
        }
    }

    public function forceDelete($id)
    {
        try {
            $article = Article::withTrashed()->findOrFail($id);
            $article->forceDelete();

            return redirect()->route('articles.index')
                ->with('message', 'Article permanently deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('articles.index')
                ->with('error', 'Error force deleting article: ' . $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $article = Article::withTrashed()->findOrFail($id);
            $article->restore();

            return redirect()->route('articles.index')
                ->with('message', 'Article restored successfully.');
        } catch (\Exception $e) {
            return redirect()->route('articles.index')
                ->with('error', 'Error restoring article: ' . $e->getMessage());
        }
    }
}
