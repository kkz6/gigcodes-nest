import { IsUniqueConstraint } from '@common/decorators';
import { CustomThrottlerGuard } from '@common/guards';
import {
  ClearCacheInterceptor,
  HttpCacheInterceptor,
} from '@common/interceptors';
import {
  NestCacheModule,
  NestCaslModule,
  NestConfigModule,
  NestFileModule,
  NestI18nModule,
  NestJwtModule,
  NestPinoModule,
  NestThrottlerModule,
  NestMailModule,
  OrmModule,
} from '@lib/index';
// import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    OrmModule,
    // AuthModule,
    NestConfigModule,
    NestI18nModule,
    NestCacheModule,
    NestThrottlerModule,
    NestPinoModule,
    NestCaslModule,
    NestJwtModule,
    NestFileModule,
    NestMailModule,
  ],
  providers: [
    IsUniqueConstraint,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClearCacheInterceptor,
    },
  ],
})
export class SharedModule {}
