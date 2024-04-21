import process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import {
  redis,
  redisConfigValidationSchema,
  app,
  appConfigValidationSchema,
  throttle,
  throttleConfigValidationSchema,
  database,
  databaseConfigValidationSchema,
  mail,
  mailConfigValidationSchema,
  file,
  fileConfigValidationSchema,
} from './configs';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      load: [app, redis, throttle, database, mail,file],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        ...appConfigValidationSchema,
        ...redisConfigValidationSchema,
        ...throttleConfigValidationSchema,
        ...databaseConfigValidationSchema,
        ...mailConfigValidationSchema,
        ...fileConfigValidationSchema,
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
