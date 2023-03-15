
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class League {
    id: string;
    name: string;
    pokemons?: Nullable<Pokemon[]>;
}

export abstract class IQuery {
    abstract leagues(): Nullable<League[]> | Promise<Nullable<League[]>>;

    abstract league(id: string): League | Promise<League>;

    abstract pokemons(): Nullable<Pokemon[]> | Promise<Nullable<Pokemon[]>>;

    abstract pokemon(id?: Nullable<string>): Pokemon | Promise<Pokemon>;
}

export abstract class IMutation {
    abstract create(name: string): Nullable<League> | Promise<Nullable<League>>;

    abstract update(id: string, name: string): Nullable<League> | Promise<Nullable<League>>;

    abstract delete(id: string): Nullable<Deleted> | Promise<Nullable<Deleted>>;

    abstract createPokemon(name: string, type: string): Nullable<Pokemon> | Promise<Nullable<Pokemon>>;

    abstract updatePokemon(id?: Nullable<string>, name?: Nullable<string>, type?: Nullable<string>): Nullable<Pokemon> | Promise<Nullable<Pokemon>>;

    abstract deletePokemon(id: string): Nullable<Deleted> | Promise<Nullable<Deleted>>;
}

export class Pokemon {
    id: string;
    name: string;
    type: string;
    league: League;
}

export class Deleted {
    delete: boolean;
}

type Nullable<T> = T | null;
