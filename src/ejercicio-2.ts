/**
* Interfaz para canciones
*/
export interface ISong {
    name: string;
    duration: number; // en segundos
    genres: string[];
    isSingle: boolean;
    plays: number;
}
  
/**
 * Clase que implementa una canción
 */
export class Song implements ISong {
    constructor(
        public name: string,
        public duration: number,
        public genres: string[],
        public isSingle: boolean,
        public plays: number
    ) {}
}
  
/**
 * Interfaz para álbum
 */
export interface IAlbum {
    name: string;
    year: number;
    songs: Song[];
}
  
/**
 * Clase que implementa un álbum y provee métodos para cálculos
 */
export class Album implements IAlbum {
    constructor(public name: string, public year: number, public songs: Song[] = []) {}

    /**
     * Calcula el número de canciones del álbum
     * @returns {number} Número de canciones
     */
    getSongCount(): number {
        return this.songs.length;
    }

    /**
     * Calcula la duración total del álbum (suma de la duración de sus canciones)
     * @returns {number} Duración total en segundos
     */
    getTotalDuration(): number {
        return this.songs.reduce((acc, song) => acc + song.duration, 0);
    }

    /**
     * Calcula el total de reproducciones del álbum (suma de las reproducciones de sus canciones)
     * @returns {number} Total de reproducciones
     */
    getTotalPlays(): number {
        return this.songs.reduce((acc, song) => acc + song.plays, 0);
    }
}
  
/**
 * Interfaz para un artista
 */
export interface IArtist {
    name: string;
    monthlyListeners: number;
    discography: Album[];
}
  
/**
 * Clase que implementa un artista
 */
export class Artist implements IArtist {
    constructor(public name: string, public monthlyListeners: number, public discography: Album[] = []) {}
}
  
/**
 * Clase que representa la biblioteca musical
 */
export class MusicLibrary {
    private artists: Artist[] = [];

    /**
     * Agrega un artista a la biblioteca
     * @param {Artist} artist - El artista a agregar
     */
    addArtist(artist: Artist): void {
        this.artists.push(artist);
    }

    /**
     * Muestra la información de la biblioteca en formato tabla
     */
    displayLibrary(): void {
        const libraryData = [];
        for (const artist of this.artists) {
        for (const album of artist.discography) {
            libraryData.push({
            Artist: artist.name,
            'Oyentes mensuales': artist.monthlyListeners,
            Album: album.name,
            Año: album.year,
            'N° Canciones': album.getSongCount(),
            'Duración Total (s)': album.getTotalDuration(),
            'Reproducciones Totales': album.getTotalPlays()
            });
        }
        }
        console.table(libraryData);
    }

    /**
     * Búsqueda de artistas utilizando un predicado
     * @param {(artist: Artist) => boolean} predicate - Función de búsqueda
     * @returns {Artist[]} Lista de artistas que cumplen con el predicado
     */
    searchArtists(predicate: (artist: Artist) => boolean): Artist[] {
        return this.artists.filter(predicate);
    }

    /**
     * Búsqueda de álbumes utilizando un predicado
     * @param {(album: Album) => boolean} predicate - Función de búsqueda
     * @returns {Album[]} Lista de álbumes que cumplen con el predicado
     */
    searchAlbums(predicate: (album: Album) => boolean): Album[] {
        const albums: Album[] = [];
        this.artists.forEach(artist => {
        albums.push(...artist.discography.filter(predicate));
        });
        return albums;
    }

    /**
     * Búsqueda de canciones utilizando un predicado
     * @param {(song: Song) => boolean} predicate - Función de búsqueda
     * @returns {Song[]} Lista de canciones que cumplen con el predicado
     */
    searchSongs(predicate: (song: Song) => boolean): Song[] {
        const songs: Song[] = [];
        this.artists.forEach(artist => {
        artist.discography.forEach(album => {
            songs.push(...album.songs.filter(predicate));
        });
        });
        return songs;
    }
}