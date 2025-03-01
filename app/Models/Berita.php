<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Berita extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'berita';

    protected $fillable = [
        'title',
        'slug',
        'content',
        'keywords',
        'meta_description',
        'image',
        'compressed_image',
        'thumbnail',
        'author',
        'status',
        'views',
        'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'views' => 'integer',
    ];

    protected $dates = ['deleted_at'];

    /**
     * Boot method untuk mengatur event model
     */
    protected static function boot()
    {
        parent::boot();

        // Menangani penghapusan file saat model dihapus secara permanen
        static::deleting(function ($berita) {
            if ($berita->isForceDeleting()) {
                if ($berita->image) {
                    Storage::disk('public')->delete($berita->image);
                    Storage::disk('public')->delete($berita->compressed_image);
                    Storage::disk('public')->delete($berita->thumbnail);
                }
            }
        });
    }

    /**
     * Format content untuk tampilan
     */
    public function getFormattedContentAttribute()
    {
        return nl2br(e($this->content));
    }
}
