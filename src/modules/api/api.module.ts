import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { League, Pokemon } from 'src/graphql.schema';
import { LeagueModule } from './league/league.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        validationSchema: Joi.object({
            NODE_ENV: Joi.string()
                .valid('devlopment', 'production', 'test', 'local')
                .default('devlopment'),
            PORT: Joi.number().default(3000),
            DATABASE_URL: Joi.string().required()
        })
    }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            return {
                name: 'default',
                type: 'postgres',
                url: configService.get('DATABASE_URL'),
                entities: [__dirname + '/**/**.entity{.js,.ts}'],
                synchronize: true
            } as TypeOrmModuleAsyncOptions
        }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
        playground: true,
        driver: ApolloDriver,
        typePaths: ['./**/*.graphql'],
        context: ({ req }) => ({ headers: req.headers }),
        definitions: {
            path: join(process.cwd(), 'src/graphql.schema.ts'),
            outputAs: 'class'
        },
    }),
    PokemonModule,
    LeagueModule
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
