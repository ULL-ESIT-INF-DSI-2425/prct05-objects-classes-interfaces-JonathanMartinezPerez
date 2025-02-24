/**
 * Enumerado para los tipos de Pokémon
 */
export enum PokemonType {
  Fuego = "Fuego",
  Agua = "Agua",
  Hierba = "Hierba",
  Electrico = "Electrico"
}

/**
 * Interfaz para las estadísticas básicas
 */
export interface PokemonStats {
  attack: number;
  defense: number;
  speed: number;
  hp: number; // Daño máximo o HP máximo
}

/**
 * Interfaz para la estructura básica de un Pokémon
 */
export interface IPokemon {
  name: string;
  weight: number;
  height: number;
  type: PokemonType;
  stats: PokemonStats;
}

/**
 * Clase Pokémon que implementa la interfaz IPokemon
 */
export class Pokemon implements IPokemon {
  name: string;
  weight: number;
  height: number;
  type: PokemonType;
  stats: PokemonStats;
  currentHp: number;

  constructor(name: string, weight: number, height: number, type: PokemonType, stats: PokemonStats) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.type = type;
    this.stats = stats;
    this.currentHp = stats.hp;
  }

  /**
   * Método para mostrar la información del Pokémon
   * @returns {string} Información del Pokémon
   */
  info(): string {
    return `${this.name} (Tipo: ${this.type}) - Peso: ${this.weight}, Altura: ${this.height}, Stats: [Ataque: ${this.stats.attack}, Defensa: ${this.stats.defense}, Velocidad: ${this.stats.speed}, HP: ${this.stats.hp}]`;
  }
}

/**
 * Clase Pokedex para almacenar y buscar Pokémon
 */
export class Pokedex {
  private pokemons: Pokemon[] = [];

  /**
   * Agrega un Pokémon a la Pokedex
   * @param {Pokemon} pokemon - El Pokémon a agregar
   */
  addPokemon(pokemon: Pokemon): void {
    this.pokemons.push(pokemon);
  }

  /**
   * Lista por consola la información de todos los Pokémon
   */
  listPokemon(): void {
    this.pokemons.forEach(pokemon => {
      console.log(pokemon.info());
    });
  }

  /**
   * Permite buscar Pokémon en función de un predicado.
   * De esta forma se pueden filtrar por cualquier campo (por ejemplo, tipo, nombre, estadísticas, etc.)
   * @param {(pokemon: Pokemon) => boolean} predicate - Función de búsqueda
   * @returns {Pokemon[]} Lista de Pokémon que cumplen con el predicado
   */
  search(predicate: (pokemon: Pokemon) => boolean): Pokemon[] {
    return this.pokemons.filter(predicate);
  }
}

/**
 * Función para obtener la efectividad del ataque basado en los tipos del atacante y del defensor.
 * Según las reglas:
 * - Fuego: > Hierba (efectivo, 2), < Agua (no efectivo, 0.5), = Electrico (neutral, 1)
 * - Agua: < Hierba (no efectivo, 0.5), < Electrico (no efectivo, 0.5); el resto es neutral
 * - Hierba: > Agua (efectivo, 2), = Electrico (neutral, 1); el resto es neutral
 * - Electrico: sin reglas específicas, se asume neutral (1)
 * @param {PokemonType} attacker - Tipo del Pokémon atacante
 * @param {PokemonType} defender - Tipo del Pokémon defensor
 * @returns {number} Efectividad del ataque
 */
export function getEffectiveness(attacker: PokemonType, defender: PokemonType): number {
  const effectivenessMap: { [key in PokemonType]?: { [key in PokemonType]?: number } } = {
    [PokemonType.Fuego]: {
      [PokemonType.Hierba]: 2,
      [PokemonType.Agua]: 0.5,
      [PokemonType.Electrico]: 1,
    },
    [PokemonType.Agua]: {
      [PokemonType.Hierba]: 0.5,
      [PokemonType.Electrico]: 0.5,
    },
    [PokemonType.Hierba]: {
      [PokemonType.Agua]: 2,
      [PokemonType.Electrico]: 1,
    },
    // Para Electrico se asume que cualquier ataque es neutral.
  };

  return effectivenessMap[attacker]?.[defender] ?? 1;
}

/**
 * Clase Combat que simula un combate entre dos Pokémon
 */
export class Combat {
  private pokemon1: Pokemon;
  private pokemon2: Pokemon;

  constructor(pokemon1: Pokemon, pokemon2: Pokemon) {
    // Se asume que pokemon1 ataca primero.
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
  }

  /**
   * Método start: simula el combate por turnos y muestra la evolución por consola.
   */
  start(): void {
    console.log("Inicio del combate:");
    console.log(`${this.pokemon1.name} vs ${this.pokemon2.name}`);

    let attacker: Pokemon = this.pokemon1;
    let defender: Pokemon = this.pokemon2;
    let turno = 1;

    while (this.pokemon1.currentHp > 0 && this.pokemon2.currentHp > 0) {
      console.log(`\nTurno ${turno}:`);

      const effectiveness = getEffectiveness(attacker.type, defender.type);
      const damage = 50 * (attacker.stats.attack / defender.stats.defense) * effectiveness;

      defender.currentHp -= damage;
      if (defender.currentHp < 0) defender.currentHp = 0;

      console.log(`${attacker.name} ataca a ${defender.name} causando ${damage.toFixed(2)} de daño.`);
      console.log(`Estado actual: ${attacker.name} HP: ${attacker.currentHp.toFixed(2)}, ${defender.name} HP: ${defender.currentHp.toFixed(2)}`);

      if (defender.currentHp === 0) {
        console.log(`\n${defender.name} ha sido derrotado. ¡${attacker.name} es el ganador!`);
        break;
      }

      // Se intercambian los roles para el siguiente turno.
      [attacker, defender] = [defender, attacker];
      turno++;
    }
  }
}