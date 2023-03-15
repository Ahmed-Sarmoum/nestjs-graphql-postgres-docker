import { Field, ObjectType } from "@nestjs/graphql"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { League } from "./league.entity"

@ObjectType()
@Entity('pokemon')
export class Pokemon {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column('varchar', { length: 500, unique: true })
    name: string

    @Field()
    @Column('varchar', { length: 500 })
    type: string

    @ManyToOne(() => League, league => league.pokemons, {
        eager: true
    })
    @Field(() => League) 
    league: League
}