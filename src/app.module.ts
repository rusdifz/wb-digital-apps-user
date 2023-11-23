import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Database } from './config/db';

import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        Database
      ]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get("config_db"),
      inject: [ConfigService]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
