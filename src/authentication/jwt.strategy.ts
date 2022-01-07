import { UsersService } from './../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import TokenPayload from './tokenPayload.interface';
import { Request } from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
            return request?.cookies?.Authentication;
          }]),
          secretOrKey: configService.get('JWT_SECRET')
        });
      }
     
      async validate(payload: TokenPayload) {
        return this.userService.getById(payload.userId);
      }
}