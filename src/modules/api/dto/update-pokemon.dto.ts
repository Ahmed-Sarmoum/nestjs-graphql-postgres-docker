import { PartialType } from "@nestjs/graphql";
import { CreatePokemonInput } from "./create-pokemon.dto";

export class UpdatePokemonInput extends PartialType(CreatePokemonInput) {

}