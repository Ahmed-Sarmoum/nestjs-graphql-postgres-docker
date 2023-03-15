import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "../entities/pokemon.entity";
import { PokemonResolver } from "./pokemon.resolver";
import { PokemonService } from "./pokemon.service";

@Module({
    imports: [TypeOrmModule.forFeature([Pokemon])],
    providers: [PokemonService, PokemonResolver],
    exports: [PokemonService, PokemonResolver],
})

export class PokemonModule {}