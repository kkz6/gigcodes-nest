import type { CacheStore } from '@nestjs/cache-manager';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Configs, true>) => {
        const store = await redisStore({
          host: configService.get<number>('redis.host', { infer: true }),
          port: configService.get<number>('redis.port', { infer: true }),
          username: configService.get<string>('redis.username', {
            infer: true,
          }),
          password: configService.get<string>('redis.password', {
            infer: true,
          }),
          keepAlive: 120,
          ttl: configService.get<number>('redis.ttl', { infer: true }),
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
    }),
  ],
  exports: [CacheModule, CacheService],
  providers: [CacheService],
})
export class NestCacheModule {}
