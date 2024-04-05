import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { app, appConfigValidationSchema } from './configs/app.config';
import Joi from 'joi';
import { redis, redisConfigValidationSchema } from './configs/redis.config';
// import { HelperService } from '@common/helpers';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [app, redis],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        ...appConfigValidationSchema,
        ...redisConfigValidationSchema,
      }),
      validationOptions: {
        abortEarly: true,
        // cache: !HelperService.isProd(),
        // debug: !HelperService.isProd(),
        // stack: !HelperService.isProd(),
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
