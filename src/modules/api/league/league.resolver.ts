import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateLeagueInput } from "../dto/create-league.dto";
import { UpdateLeagueInput } from "../dto/update-league.dto";
import { League } from "../entities/league.entity";
import { LeagueService } from "./league.service";

@Resolver(() => [League])
export class LeagueResolver {

    constructor(private readonly leagueService: LeagueService) {}


    @Query()
    async league(@Args('id') id: string) {
        return await this.leagueService.getLeague(id)
    }

    @Query()
    async leagues() {
        return await this.leagueService.getLeagues()
    }

    @Mutation()
    async create(@Args('name') name: string) {
        return await this.leagueService.create({name})
    }

    @Mutation() 
    async update(@Args('id') id: string, @Args('name') name: string) {
        return await  this.leagueService.update(id, {name})
    }

    @Mutation()
    async delete(@Args('id') id: string) {
        await this.leagueService.delete(id)
        return { delete: true }
    }
    
}