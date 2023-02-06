import { Request, Response } from "express";
import { PokemonBusiness } from "../Business/PokemonBusiness";
import { PokemonsDatabase } from "../database/PokemonsDatabase";
import { Pokemons } from "../models/Pokemon";
import { Pokemon } from "../types";

export class PokemonController {
  public getPokemons = async (req: Request, res: Response) => {
    try {
      const input = req.query.q as string;

      const pokemonBusiness = new PokemonBusiness();
      const output = await pokemonBusiness.getPokemons(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public postPokemon = async (req: Request, res: Response) => {
    try {
      // input
      const input = {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
      };

      const pokemonBusiness = new PokemonBusiness();
      const output = await pokemonBusiness.postPokemon(input);

      // output
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public updatePokemon = async (req: Request, res: Response) => {
    try {
      const input = {
        idPokemon: req.params.id as string,
        id: req.body.id as string | undefined,
        name: req.body.name as string | undefined,
        type: req.body.type as string | undefined,
        hp: req.body.hp as number | undefined,
        attack: req.body.attack as number | undefined,
        defense: req.body.defense as number | undefined,
      };
      // input
      const pokemonBusiness = new PokemonBusiness();
      const output = await pokemonBusiness.updatePokemon(input);

      // output
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public deletePokemon = async (req: Request, res: Response) => {
    try {
      const input = { id: req.params.id };

      const pokemonBusiness = new PokemonBusiness();
      const output = await pokemonBusiness.deletePokemon(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
