import { BadRequestException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLeagueInput } from "../dto/create-league.dto";
import { UpdateLeagueInput } from "../dto/update-league.dto";
import { League } from "../entities/league.entity";

@Injectable()
export class LeagueService {
    constructor(@InjectRepository(League) private readonly repo: Repository<League>){}

    async create(createLeagueInput: CreateLeagueInput) {
        const league = new League()
        Object.assign(league, createLeagueInput)
         await this.repo.save(league)
         return league   
    }

    async update(id: string, updateLeagueInput: UpdateLeagueInput) {
        const league = await this.repo.findOne({where: {id}})
        
        if (!league) {
            throw new BadRequestException('No league is here !!!!')
        }

        Object.assign(league, updateLeagueInput)
        return await this.repo.save(league)
    }

    async delete(id: string) {
        const league = await this.repo.findOne({where: {id}})

        if (!league) {    
            throw new BadRequestException('there is no league here !!!!')
        }

        await this.repo.delete(id)
        return league 
    }

    async getLeague(id: string) {
        return await this.repo.findOne({where: {id}})
    }

    async getLeagues() {
        return await this.repo.find()
    }
}