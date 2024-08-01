<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;

    protected $table = 'tracks';

    protected $fillable = [
        'title'
    ];

    /**
     * The albums that belong to the track.
     */
    public function albums()
    {
        return $this->belongsToMany(Album::class, 'album_track', 'track_id', 'album_id');
    }
}
