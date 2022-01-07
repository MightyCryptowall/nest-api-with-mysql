import { DatabaseModule } from './../database/database.module';
import { UsersModule } from './../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';

import { Repository } from 'typeorm';
import { AuthenticationService } from './authentication.service';
import * as Joi from '@hapi/joi';
import { getRepositoryToken } from '@nestjs/typeorm';
import mockedConfigService from '../utils/mocks/config.service';
import mockedJwtService from '../utils/mocks/jwt.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService
        },
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    authenticationService = await module.get<AuthenticationService>(AuthenticationService);
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = '23ca0e0b-cce0-43e6-8371-059f1f94ea76';
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId),
      ).toEqual('string');
    });
  });
});
