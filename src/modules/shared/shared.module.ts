import {
  NestCacheModule,
  NestConfigModule,
  NestI18nModule,
  NestThrottlerModule,
} from '@lib/index';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestConfigModule,
    NestI18nModule,
    NestCacheModule,
    NestThrottlerModule,
  ],
  providers: [],
})
export class SharedModule {}
