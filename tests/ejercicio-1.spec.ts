import { describe, expect, test, vi } from "vitest";
import { Pokemon, Pokedex, getEffectiveness, Combat, PokemonType, PokemonStats } from "../src/ejercicio-1";

describe("Pokemon Class", () => {
  test("should create a Pokemon instance", () => {
    const stats: PokemonStats = { attack: 50, defense: 50, speed: 50, hp: 100 };
    const pikachu = new Pokemon("Pikachu", 6, 0.4, PokemonType.Electrico, stats);

    expect(pikachu.name).toBe("Pikachu");
    expect(pikachu.weight).toBe(6);
    expect(pikachu.height).toBe(0.4);
    expect(pikachu.type).toBe(PokemonType.Electrico);
    expect(pikachu.stats).toEqual(stats);
    expect(pikachu.currentHp).toBe(100);
  });

  test("should return correct info", () => {
    const stats: PokemonStats = { attack: 50, defense: 50, speed: 50, hp: 100 };
    const pikachu = new Pokemon("Pikachu", 6, 0.4, PokemonType.Electrico, stats);

    expect(pikachu.info()).toBe("Pikachu (Tipo: Electrico) - Peso: 6, Altura: 0.4, Stats: [Ataque: 50, Defensa: 50, Velocidad: 50, HP: 100]");
  });
});

describe("Pokedex Class", () => {
  test("should add and list Pokemon", () => {
    const stats: PokemonStats = { attack: 50, defense: 50, speed: 50, hp: 100 };
    const pikachu = new Pokemon("Pikachu", 6, 0.4, PokemonType.Electrico, stats);
    const pokedex = new Pokedex();

    pokedex.addPokemon(pikachu);

    const consoleSpy = vi.spyOn(console, 'log');
    pokedex.listPokemon();
    expect(consoleSpy).toHaveBeenCalledWith("Pikachu (Tipo: Electrico) - Peso: 6, Altura: 0.4, Stats: [Ataque: 50, Defensa: 50, Velocidad: 50, HP: 100]");
  });

  test("should search Pokemon by predicate", () => {
    const stats: PokemonStats = { attack: 50, defense: 50, speed: 50, hp: 100 };
    const pikachu = new Pokemon("Pikachu", 6, 0.4, PokemonType.Electrico, stats);
    const charmander = new Pokemon("Charmander", 8.5, 0.6, PokemonType.Fuego, stats);
    const pokedex = new Pokedex();

    pokedex.addPokemon(pikachu);
    pokedex.addPokemon(charmander);

    const result = pokedex.search(pokemon => pokemon.type === PokemonType.Fuego);
    expect(result).toEqual([charmander]);
  });
});

describe("getEffectiveness Function", () => {
  test("should return correct effectiveness", () => {
    expect(getEffectiveness(PokemonType.Fuego, PokemonType.Hierba)).toBe(2);
    expect(getEffectiveness(PokemonType.Fuego, PokemonType.Agua)).toBe(0.5);
    expect(getEffectiveness(PokemonType.Fuego, PokemonType.Electrico)).toBe(1);
    expect(getEffectiveness(PokemonType.Agua, PokemonType.Hierba)).toBe(0.5);
    expect(getEffectiveness(PokemonType.Hierba, PokemonType.Agua)).toBe(2);
    expect(getEffectiveness(PokemonType.Electrico, PokemonType.Fuego)).toBe(1);
  });
});

describe("Combat Class", () => {
  test("should simulate a combat", () => {
    const stats1: PokemonStats = { attack: 50, defense: 50, speed: 50, hp: 100 };
    const stats2: PokemonStats = { attack: 40, defense: 40, speed: 40, hp: 80 };
    const pikachu = new Pokemon("Pikachu", 6, 0.4, PokemonType.Electrico, stats1);
    const charmander = new Pokemon("Charmander", 8.5, 0.6, PokemonType.Fuego, stats2);
    const combat = new Combat(pikachu, charmander);

    const consoleSpy = vi.spyOn(console, 'log');
    combat.start();
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should simulate a combat", () => {
    const stats1: PokemonStats = { attack: 50, defense: 50, speed: 50, hp: 100 };
    const stats2: PokemonStats = { attack: 35, defense: 40, speed: 55, hp: 75 };
    const pikachu = new Pokemon("Bulbasaur", 6, 0.4, PokemonType.Hierba, stats1);
    const charmander = new Pokemon("Squirtle", 8.5, 0.6, PokemonType.Agua, stats2);
    const combat = new Combat(pikachu, charmander);

    const consoleSpy = vi.spyOn(console, 'log');
    combat.start();
    expect(consoleSpy).toHaveBeenCalled();
  });
  
});