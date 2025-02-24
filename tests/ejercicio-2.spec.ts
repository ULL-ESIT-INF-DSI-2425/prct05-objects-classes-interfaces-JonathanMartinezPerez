import { describe, expect, test, vi } from "vitest";
import { Song, Album, Artist, MusicLibrary } from "../src/ejercicio-2";

describe("Song Class", () => {
  test("should create a Song instance", () => {
    const song = new Song("Song1", 180, ["Pop"], true, 1000);

    expect(song.name).toBe("Song1");
    expect(song.duration).toBe(180);
    expect(song.genres).toEqual(["Pop"]);
    expect(song.isSingle).toBe(true);
    expect(song.plays).toBe(1000);
  });
});

describe("Album Class", () => {
  test("should create an Album instance", () => {
    const song = new Song("Song1", 180, ["Pop"], true, 1000);
    const album = new Album("Album1", 2021, [song]);

    expect(album.name).toBe("Album1");
    expect(album.year).toBe(2021);
    expect(album.songs).toEqual([song]);
  });

  test("should calculate song count", () => {
    const song1 = new Song("Song1", 180, ["Pop"], true, 1000);
    const song2 = new Song("Song2", 200, ["Rock"], false, 500);
    const album = new Album("Album1", 2021, [song1, song2]);

    expect(album.getSongCount()).toBe(2);
  });

  test("should calculate total duration", () => {
    const song1 = new Song("Song1", 180, ["Pop"], true, 1000);
    const song2 = new Song("Song2", 200, ["Rock"], false, 500);
    const album = new Album("Album1", 2021, [song1, song2]);

    expect(album.getTotalDuration()).toBe(380);
  });

  test("should calculate total plays", () => {
    const song1 = new Song("Song1", 180, ["Pop"], true, 1000);
    const song2 = new Song("Song2", 200, ["Rock"], false, 500);
    const album = new Album("Album1", 2021, [song1, song2]);

    expect(album.getTotalPlays()).toBe(1500);
  });
});

describe("Artist Class", () => {
  test("should create an Artist instance", () => {
    const album = new Album("Album1", 2021);
    const artist = new Artist("Artist1", 1000000, [album]);

    expect(artist.name).toBe("Artist1");
    expect(artist.monthlyListeners).toBe(1000000);
    expect(artist.discography).toEqual([album]);
  });
});

describe("MusicLibrary Class", () => {
  test("should add and display artists", () => {
    const song = new Song("Song1", 180, ["Pop"], true, 1000);
    const album = new Album("Album1", 2021, [song]);
    const artist = new Artist("Artist1", 1000000, [album]);
    const library = new MusicLibrary();

    library.addArtist(artist);

    const consoleSpy = vi.spyOn(console, 'table');
    library.displayLibrary();
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should search artists by predicate", () => {
    const album = new Album("Album1", 2021);
    const artist1 = new Artist("Artist1", 1000000, [album]);
    const artist2 = new Artist("Artist2", 500000, [album]);
    const library = new MusicLibrary();

    library.addArtist(artist1);
    library.addArtist(artist2);

    const result = library.searchArtists(artist => artist.monthlyListeners > 800000);
    expect(result).toEqual([artist1]);
  });

  test("should search albums by predicate", () => {
    const song = new Song("Song1", 180, ["Pop"], true, 1000);
    const album1 = new Album("Album1", 2021, [song]);
    const album2 = new Album("Album2", 2020, [song]);
    const artist = new Artist("Artist1", 1000000, [album1, album2]);
    const library = new MusicLibrary();

    library.addArtist(artist);

    const result = library.searchAlbums(album => album.year === 2021);
    expect(result).toEqual([album1]);
  });

  test("should search songs by predicate", () => {
    const song1 = new Song("Song1", 180, ["Pop"], true, 1000);
    const song2 = new Song("Song2", 200, ["Rock"], false, 500);
    const album = new Album("Album1", 2021, [song1, song2]);
    const artist = new Artist("Artist1", 1000000, [album]);
    const library = new MusicLibrary();

    library.addArtist(artist);

    const result = library.searchSongs(song => song.genres.includes("Pop"));
    expect(result).toEqual([song1]);
  });
});