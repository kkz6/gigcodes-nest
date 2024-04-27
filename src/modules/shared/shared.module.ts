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
  NestMailModule,
  NestPinoModule,
  NestThrottlerModule,
  OrmModule,
} from '@lib/index';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    OrmModule,
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
