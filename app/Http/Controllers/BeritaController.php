<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index()
    {
        $berita = Berita::whereNull('deleted_at')
            ->latest()
            ->paginate(9);

        return Inertia::render('Berita/Index', [
            'berita' => $berita
        ]);
    }

    public function create()
    {
        return Inertia::render('Berita/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'keywords' => 'nullable|string',
            'meta_description' => 'nullable|string|max:160',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
            'author' => 'required|string|max:255',
            'status' => 'required|in:draft,published'
        ]);

        try {
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $originalPath = $image->store('berita/original', 'public');

                // Compressed version
                $compressedImage = Image::make($image);
                if ($compressedImage->width() > 1200) {
                    $compressedImage->resize(1200, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }
                $compressedPath = 'berita/compressed/' . basename($originalPath);
                Storage::disk('public')->put(
                    $compressedPath,
                    $compressedImage->encode(null, 80)->stream()
                );

                // Thumbnail version
                $thumbnailImage = Image::make($image);
                $thumbnailImage->fit(300, 200);
                $thumbnailPath = 'berita/thumbnail/' . basename($originalPath);
                Storage::disk('public')->put(
                    $thumbnailPath,
                    $thumbnailImage->encode(null, 70)->stream()
                );

                Berita::create([
                    'title' => $request->title,
                    'slug' => Str::slug($request->title),
                    'content' => $request->content,
                    'keywords' => $request->keywords,
                    'meta_description' => $request->meta_description,
                    'image' => $originalPath,
                    'compressed_image' => $compressedPath,
                    'thumbnail' => $thumbnailPath,
                    'author' => $request->author,
                    'status' => $request->status,
                    'published_at' => $request->status === 'published' ? now() : null,
                    'views' => 0
                ]);

                return redirect()->route('berita.index')
                    ->with('message', 'Berita created successfully.');
            }
        } catch (\Exception $e) {
            // Clean up any uploaded files if there's an error
            if (isset($originalPath)) {
                Storage::disk('public')->delete($originalPath);
            }
            if (isset($compressedPath)) {
                Storage::disk('public')->delete($compressedPath);
            }
            if (isset($thumbnailPath)) {
                Storage::disk('public')->delete($thumbnailPath);
            }

            return redirect()->back()
                ->withInput()
                ->with('error', 'Error creating berita: ' . $e->getMessage());
        }
    }

    public function edit(Berita $berita)
    {
        return Inertia::render('Berita/Edit', [
            'berita' => $berita
        ]);
    }

    public function update(Request $request, Berita $berita)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'keywords' => 'nullable|string',
            'meta_description' => 'nullable|string|max:160',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'author' => 'required|string|max:255',
            'status' => 'required|in:draft,published'
        ]);

        try {
            $data = [
                'title' => $request->title,
                'slug' => Str::slug($request->title),
                'content' => $request->content,
                'keywords' => $request->keywords,
                'meta_description' => $request->meta_description,
                'author' => $request->author,
                'status' => $request->status
            ];

            if ($request->status === 'published' && !$berita->published_at) {
                $data['published_at'] = now();
            }

            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Store new images first
                $originalPath = $image->store('berita/original', 'public');

                // Create compressed version
                $compressedImage = Image::make($image);
                if ($compressedImage->width() > 1200) {
                    $compressedImage->resize(1200, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                }
                $compressedPath = 'berita/compressed/' . basename($originalPath);
                Storage::disk('public')->put(
                    $compressedPath,
                    $compressedImage->encode(null, 80)->stream()
                );

                // Create thumbnail version
                $thumbnailImage = Image::make($image);
                $thumbnailImage->fit(300, 200);
                $thumbnailPath = 'berita/thumbnail/' . basename($originalPath);
                Storage::disk('public')->put(
                    $thumbnailPath,
                    $thumbnailImage->encode(null, 70)->stream()
                );

                // Delete old images after successful upload of new ones
                if ($berita->image) {
                    Storage::disk('public')->delete($berita->image);
                    Storage::disk('public')->delete($berita->compressed_image);
                    Storage::disk('public')->delete($berita->thumbnail);
                }

                $data['image'] = $originalPath;
                $data['compressed_image'] = $compressedPath;
                $data['thumbnail'] = $thumbnailPath;
            }

            $berita->update($data);

            return redirect()->route('berita.index')
                ->with('message', 'Berita updated successfully.');
        } catch (\Exception $e) {
            // Clean up any new uploaded files if there's an error
            if (isset($originalPath)) {
                Storage::disk('public')->delete($originalPath);
                Storage::disk('public')->delete($compressedPath);
                Storage::disk('public')->delete($thumbnailPath);
            }

            return redirect()->back()
                ->withInput()
                ->with('error', 'Error updating berita: ' . $e->getMessage());
        }
    }

    public function destroy(Berita $berita)
    {
        try {
            // This will trigger soft delete
            $berita->delete();

            return redirect()->route('berita.index')
                ->with('message', 'Berita deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('berita.index')
                ->with('error', 'Error deleting berita: ' . $e->getMessage());
        }
    }

    public function forceDelete($id)
    {
        try {
            $berita = Berita::withTrashed()->findOrFail($id);
            $berita->forceDelete();

            return redirect()->route('berita.index')
                ->with('message', 'Berita permanently deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('berita.index')
                ->with('error', 'Error force deleting berita: ' . $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $berita = Berita::withTrashed()->findOrFail($id);
            $berita->restore();

            return redirect()->route('berita.index')
                ->with('message', 'Berita restored successfully.');
        } catch (\Exception $e) {
            return redirect()->route('berita.index')
                ->with('error', 'Error restoring berita: ' . $e->getMessage());
        }
    }
}
