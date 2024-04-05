import { NestCacheModule, NestConfigModule, NestI18nModule } from '@lib/index';
import { Module } from '@nestjs/common';

@Module({
  imports: [NestConfigModule, NestI18nModule, NestCacheModule],
  providers: [],
})
export class SharedModule {}
