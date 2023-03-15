import { PartialType } from "@nestjs/graphql";
import { CreateLeagueInput } from "./create-league.dto";

export class UpdateLeagueInput extends PartialType(CreateLeagueInput) {}