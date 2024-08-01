<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $table = 'albums';

    protected $fillable = [
        'title',
        'artist_id',
        'release_year',
        'label',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * The tracks that belong to the album.
     */
    public function tracks()
    {
        return $this->belongsToMany(Track::class, 'album_track', 'album_id', 'track_id');
    }
}
