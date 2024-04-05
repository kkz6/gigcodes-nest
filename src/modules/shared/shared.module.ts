import { NestCacheModule, NestConfigModule } from '@lib/index';
import { Module } from '@nestjs/common';

@Module({
  imports: [NestConfigModule, NestCacheModule],
  providers: [],
})
export class SharedModule {}
