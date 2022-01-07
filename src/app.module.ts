import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [PostsModule, ConfigModule.forRoot({
    validationSchema: Joi.object({
      MYSQL_HOST: Joi.string().required(),
      MYSQL_PORT: Joi.number().required(),
      MYSQL_USER: Joi.string().required(),
      MYSQL_PASSWORD: Joi.string().required(),
      MYSQL_DB: Joi.string().required(),
      PORT: Joi.number(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
    })
  }), DatabaseModule, UsersModule, AuthenticationModule, CategoriesModule],
  controllers: [],
  providers: [
    // {provide: APP_FILTER, useClass: ExceptionsLoggerFilter} // ExceptionsLogger Filter is injected globally into AppModule
  ],
})
export class AppModule {}
