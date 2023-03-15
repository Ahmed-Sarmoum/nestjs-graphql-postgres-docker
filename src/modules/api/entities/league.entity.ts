import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pokemon } from "./pokemon.entity";

@ObjectType()
@Entity('league')
export class League {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column('varchar', { length: 500 , unique: true})
    name: string

    // @Column('varchar', { length: 500 })
    // type: string

    @OneToMany(() => Pokemon, pokemon => pokemon.league)
    @Field(() => Pokemon)
    pokemons: Pokemon
}