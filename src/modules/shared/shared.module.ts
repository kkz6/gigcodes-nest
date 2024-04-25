import {
  NestCacheModule,
  NestConfigModule,
  NestI18nModule,
  NestJwtModule,
  NestPinoModule,
  NestThrottlerModule,
  NestCaslModule,
} from '@lib/index';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestConfigModule,
    NestI18nModule,
    NestCacheModule,
    NestThrottlerModule,
    NestPinoModule,
    NestCaslModule,
    NestJwtModule,
  ],
  providers: [],
})
export class SharedModule {}
