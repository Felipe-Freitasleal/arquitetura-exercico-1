import { PokemonsDatabase } from "../database/PokemonsDatabase";
import { Pokemons } from "../models/Pokemon";
import { Pokemon } from "../types";

export class PokemonBusiness {
  // métodos
  public getPokemons = async (query: string) => {
    const pokemonsDatabase = new PokemonsDatabase();
    const result = await pokemonsDatabase.getPokemons(query);

    const poke = result.map(
      (pokemon) =>
        new Pokemons(
          pokemon.id,
          pokemon.name,
          pokemon.type,
          pokemon.hp,
          pokemon.attack,
          pokemon.defense
        )
    );

    return { pokemons: poke };
  };

  public postPokemon = async (input: any) => {
    const { id, name, type, hp, attack, defense } = input;

    if (typeof id !== "string") {
      throw new Error("'id' deve ser string");
    }

    if (typeof name !== "string") {
      throw new Error("'name' deve ser string");
    }

    if (typeof type !== "string") {
      throw new Error("'tipo' deve ser string");
    }

    if (typeof hp !== "number") {
      throw new Error("'HP' deve ser número");
    }

    if (typeof attack !== "number") {
      throw new Error("'Attack' deve ser número");
    }

    if (typeof defense !== "number") {
      throw new Error("'Defense' deve ser número");
    }

    const pokemonsDatabase = new PokemonsDatabase();
    const checkPokemonExist = await pokemonsDatabase.getPokemonById(id);

    if (checkPokemonExist) {
      throw new Error("Pokémon já existe");
    }

    const newPokemon = new Pokemons(id, name, type, hp, attack, defense);

    const newPokemonDB: Pokemon = {
      id: newPokemon.getId(),
      type: newPokemon.getType(),
      name: newPokemon.getName(),
      hp: newPokemon.getHp(),
      attack: newPokemon.getAttack(),
      defense: newPokemon.getDefense(),
    };

    await pokemonsDatabase.insertPokemon(newPokemonDB);

    return {
      message: "Pokemon criado",
      pokemon: newPokemon,
    };
  };

  public updatePokemon = async (input: any) => {
    const { idPokemon, id, name, type, hp, attack, defense } = input;

    if (id !== undefined) {
      if (typeof id !== "string") {
        throw new Error("'id' deve ser string");
      }
    }
    if (name !== undefined) {
      if (typeof name !== "string") {
        throw new Error("'name' deve ser string");
      }
    }
    if (type !== undefined) {
      if (typeof type !== "string") {
        throw new Error("'tipo' deve ser string");
      }
    }
    if (hp !== undefined) {
      if (typeof hp !== "number") {
        throw new Error("'HP' deve ser número");
      }
    }
    if (attack !== undefined) {
      if (typeof attack !== "number") {
        throw new Error("'Attack' deve ser número");
      }
    }
    if (defense !== undefined) {
      if (typeof defense !== "number") {
        throw new Error("'Defense' deve ser número");
      }
    }

    const pokemonsDatabase = new PokemonsDatabase();
    const checkPokemonExist = await pokemonsDatabase.getPokemonById(idPokemon);
    console.log(checkPokemonExist);

    if (!checkPokemonExist) {
      throw new Error("Pokémon não encontrado");
    }

    const pokemonFinded = new Pokemons(
      checkPokemonExist.id,
      checkPokemonExist.name,
      checkPokemonExist.type,
      checkPokemonExist.hp,
      checkPokemonExist.attack,
      checkPokemonExist.defense
    );
    console.log("Pokemon encontrado", pokemonFinded);

    // id && pokemonFinded.setId(id)

    const pokemonUpdateDB: Pokemon = {
      id: id || pokemonFinded.getId(),
      type: type || pokemonFinded.getType(),
      name: name || pokemonFinded.getName(),
      hp: hp || pokemonFinded.getHp(),
      attack: attack || pokemonFinded.getAttack(),
      defense: defense || pokemonFinded.getDefense(),
    };

    await pokemonsDatabase.updatePokemon(idPokemon, pokemonUpdateDB);

    return {
      message: "Pokemon atualizado",
      pokemon: pokemonUpdateDB,
    };
  };

  public deletePokemon = async (input: any) => {
    const { id } = input;
    const pokemonsDatabase = new PokemonsDatabase();
    const checkPokemonExist = await pokemonsDatabase.getPokemonById(id);

    if (!checkPokemonExist) {
      throw new Error("Pokémon não encontrado");
    }

    const result = await pokemonsDatabase.deletePokemon(id);

    return {
      message: "Pokémon excluído",
      pokemon: checkPokemonExist
    };
  };
}
