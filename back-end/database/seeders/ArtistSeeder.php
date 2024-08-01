<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Artist;

class ArtistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Artist::updateOrCreate(
            [
                'name' => 'Tião Carreiro & Pardinho',
                'genre' => 'sertanejo-raiz',
            ]
        );
    }
}
