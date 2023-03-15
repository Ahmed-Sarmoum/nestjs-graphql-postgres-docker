import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePokemonInput } from "../dto/create-pokemon.dto";
import { UpdatePokemonInput } from "../dto/update-pokemon.dto";
import { Pokemon } from "../entities/pokemon.entity";

@Injectable()
export class PokemonService {
    constructor(@InjectRepository(Pokemon) private repo: Repository<Pokemon>) {
        
    }

    async createPokemon(data: any) {
        const pokemon = new Pokemon()
        Object.assign(pokemon, data)

        this.repo.create(pokemon)
         await this.repo.save(pokemon)
         return pokemon
    }

    async updatePokemon(id: string, data: UpdatePokemonInput) {
        const pokemon = await this.repo.findOne({where: {id}})
 
        if (!pokemon) {
            throw new BadRequestException('this pokemon does not exists :(')
        }

        Object.assign(pokemon, data)
         await this.repo.save(pokemon)
         return pokemon
    }

    async deletePokemon(id: string) {
        const pokemon = await this.repo.findOne({where: {id}})

        if (!pokemon) {
            throw new BadRequestException('this pokemon does not exists :(')
        }
        
        await this.repo.delete(id)
        return pokemon
    }

    async getPokemon(id: string) {
        return await this.repo.findOne({where: {id}})
    }

    async getPokemons()  {
        return await this.repo.find()
    }
}