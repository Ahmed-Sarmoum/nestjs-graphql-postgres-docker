import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
        validationSchema: Joi.object({
            NODE_ENV: Joi.string()
                .valid('devlopment', 'production', 'test', 'provision')
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
                synchronize: false
            } as TypeOrmModuleAsyncOptions
        }
    }),
    GraphQLModule.forRoot({
        playground: true,
        typePaths: ['./**/*.graphql'],
        context: ({ req }) => ({ headers: req.headers }),
        debug: true,
        definitions: {
            path: join(process.cwd(), 'src/graphql.schema.ts'),
            outputAs: 'class'
        },
    })
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
