import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { UserProfile } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserProfile
    ]),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController]
})
export class UserModule {}
