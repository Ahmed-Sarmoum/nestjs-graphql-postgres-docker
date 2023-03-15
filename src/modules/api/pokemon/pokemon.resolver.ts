import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreatePokemonInput } from "../dto/create-pokemon.dto";
import { UpdatePokemonInput } from "../dto/update-pokemon.dto";
import { Pokemon } from "../entities/pokemon.entity";
import { PokemonService } from "./pokemon.service";

@Resolver(() => Pokemon)
export class PokemonResolver {
    constructor(private readonly pokemonService: PokemonService) {}

    @Query()
    async pokemons() {
        return await this.pokemonService.getPokemons()
    }

    @Query()
    async pokemon(@Args('id') id: string) {
        return await this.pokemonService.getPokemon(id)
    }

    @Mutation() 
    async deletePokemon(@Args('id') id: string) {
        await this.pokemonService.deletePokemon(id)
        return { delete: true }
    }

    @Mutation() 
    async createPokemon(@Args('name') name: string, @Args('type') type: string) {
        return await this.pokemonService.createPokemon({name, type})
    }

    @Mutation() 
    async updatePokemon(@Args('id') id, @Args('name') name, @Args('type') type) {
        return await this.pokemonService.updatePokemon(id, {name, type})
    }
 }