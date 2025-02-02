<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Article extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'image',
        'compressed_image'
    ];

    protected $dates = ['deleted_at'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($article) {
            if ($article->isForceDeleting()) {
                if ($article->image) {
                    Storage::disk('public')->delete($article->image);
                    Storage::disk('public')->delete($article->compressed_image);
                }
            }
        });
    }

    public function getFormattedContentAttribute()
    {
        return nl2br(e($this->content));
    }
}
