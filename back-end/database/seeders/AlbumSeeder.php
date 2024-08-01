<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Album;
use App\Models\Artist;

class AlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $artist = Artist::where('name', 'Tião Carreiro & Pardinho')->first(); 

        if (!$artist) {
            $this->command->error('Nenhum artista encontrado. Certifique-se de que há pelo menos um artista na tabela.');
            return;
        }

        $albums = [
            ['title' => 'Rei do Gado'
            , 'release_year' => 1961],
            ['title' => 'Casinha da Serra'
            , 'release_year' => 1963],
            ['title' => 'Linha de Frente'
            , 'release_year' => 1964],
            ['title' => 'Repertório de Ouro'
            , 'release_year' => 1964],
            ['title' => 'Os Reis do Pagode'
            , 'release_year' => 1965],
            ['title' => 'Boi Soberano'
            , 'release_year' => 1966],
            ['title' => 'Pagode na Praça'
            , 'release_year' => 1967],
            ['title' => 'Os Grandes Sucessos de Tião Carreiro & Pardinho'
            , 'release_year' => 1967],
            ['title' => 'Rancho dos Ipês'
            , 'release_year' => 1967],
            ['title' => 'Encantos da Natureza'
            , 'release_year' => 1968],
            ['title' => 'Tião Carreiro & Pardinho e Seus Grandes Sucessos'
            , 'release_year' => 1968],
            ['title' => 'Em Tempo de Avanço'
            , 'release_year' => 1969],
            ['title' => 'Sertão em Festa'
            , 'release_year' => 1970],
            ['title' => 'Show'
            , 'release_year' => 1970],
            ['title' => 'A Força do Perdão'
            , 'release_year' => 1970],
            ['title' => 'Abrindo Caminho'
            , 'release_year' => 1971],
            ['title' => 'Hoje Eu Não Posso Ir'
            , 'release_year' => 1972],
            ['title' => 'Sucessos de Tião Carreiro & Pardinho'
            , 'release_year' => 1973],
            ['title' => 'Viola Cabocla'
            , 'release_year' => 1973],
            ['title' => 'A Caminho do Sol'
            , 'release_year' => 1973],
            ['title' => 'Modas de Viola Classe "A"'
            , 'release_year' => 1974],
            ['title' => 'Esquina da Saudade'
            , 'release_year' => 1974],
            ['title' => 'Tangos em Dueto'
            , 'release_year' => 1974],
            ['title' => 'Modas de Viola Classe "A" - Volume 2'
            , 'release_year' => 1975],
            ['title' => 'Duelo de Amor'
            , 'release_year' => 1975],
            ['title' => 'Rio de Pranto'
            , 'release_year' => 1976],
            ['title' => 'Os Grandes Sucessos de Tião Carreiro & Pardinho - Volume 2'
            , 'release_year' => 1976],
            ['title' => 'É Isto que o Povo Quer - Tião Carreiro em Solos de Viola Caipira'
            , 'release_year' => 1976],
            ['title' => 'Pagodes'
            , 'release_year' => 1977],
            ['title' => 'Rancho do Vale'
            , 'release_year' => 1977],
            ['title' => 'Terra Roxa'
            , 'release_year' => 1978],
            ['title' => 'Viola Divina'
            , 'release_year' => 1978],
            ['title' => 'Disco de Ouro'
            , 'release_year' => 1979],
            ['title' => 'Golpe de Mestre'
            , 'release_year' => 1979],
            ['title' => 'Pagodes - Volume 2'
            , 'release_year' => 1979],
            ['title' => 'Tião Carreiro em Solo de Viola Caipira'
            , 'release_year' => 1979],
            ['title' => 'Seleção de Ouro'
            , 'release_year' => 1979],
            ['title' => 'Homem até Debaixo d\'Água'
            , 'release_year' => 1980],
            ['title' => 'Prato do Dia'
            , 'release_year' => 1981],
            ['title' => 'Quatro Azes'
            , 'release_year' => 1981],
            ['title' => 'Modas de Viola Classe "A" - Volume 3'
            , 'release_year' => 1981],
            ['title' => 'Navalha na Carne'
            , 'release_year' => 1982],
            ['title' => 'No Som da Viola'
            , 'release_year' => 1983],
            ['title' => 'Modas de Viola Classe "A" - Volume 4'
            , 'release_year' => 1984],
            ['title' => 'Felicidade'
            , 'release_year' => 1985],
            ['title' => 'Estrela de Ouro'
            , 'release_year' => 1986],
            ['title' => 'A Majestade "O Pagode"'
            , 'release_year' => 1988],
            ['title' => 'O Fogo e a Brasa'
            , 'release_year' => 1992],
            ['title' => 'Som da Terra - Tião Carreiro & Pardinho'
            , 'release_year' => 1994],
            ['title' => 'Som da Terra - Tião Carreiro & Pardinho - Volume 2 - Pagodes'
            , 'release_year' => 1994],
            ['title' => 'Som da Terra - Tião Carreiro & Pardinho - Volume 3 - Modas de Viola'
            , 'release_year' => 1994],
            ['title' => 'Saudades de Tião Carreiro - Tião Carreiro & Pardinho e Várias Duplas'
            , 'release_year' => 1996],
            ['title' => 'Sucessos de Ouro de Tião Carreiro & Pardinho - As Românticas'
            , 'release_year' => 1998],
            ['title' => 'Popularidade - Tião Carreiro & Pardinho'
            , 'release_year' => 1999],
            ['title' => 'Warner 25 anos'
            , 'release_year' => 2001],
            ['title' => 'Os Gigantes'
            , 'release_year' => 2003],
            ['title' => 'Warner 30 anos'
            , 'release_year' => 2006],
        ];

        foreach ($albums as $album) {
            Album::create([
                'title' => $album['title'],
                'artist_id' => $artist->id,
                'release_year' => $album['release_year'],
                'label' => null,
            ]);
        }
    }
}
