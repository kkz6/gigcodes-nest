import { SharedModule } from './shared/shared.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { applyRawBodyOnlyTo } from '@golevelup/nestjs-webhooks';
import { SWAGGER_API_ENDPOINT } from '@common/constant';
import { ClearCacheMiddleware, RealIpMiddleware } from '@common/middlewares';

const stripeWebhookPath = 'stripe/webhook';
const excludedPaths = [stripeWebhookPath, SWAGGER_API_ENDPOINT];

@Module({
  imports: [SharedModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      path: stripeWebhookPath,
      method: RequestMethod.ALL,
    });
    consumer
      .apply(RealIpMiddleware, ClearCacheMiddleware)
      .exclude(
        ...excludedPaths.map((path) => ({
          path,
          method: RequestMethod.ALL,
        })),
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
