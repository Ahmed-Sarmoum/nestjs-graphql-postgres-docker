import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { League } from "../entities/league.entity";
import { LeagueResolver } from "./league.resolver";
import { LeagueService } from "./league.service";

@Module({
    imports: [TypeOrmModule.forFeature([League])],
    providers: [LeagueResolver, LeagueService],
    exports: [LeagueResolver, LeagueService]
})

export class LeagueModule {
    
}