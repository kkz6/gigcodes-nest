import '@total-typescript/ts-reset';

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import compression from 'compression';
import helmet from 'helmet';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { AppUtils, HelperService } from '@common/helpers';
import chalk from 'chalk';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

const logger = new Logger('Bootstrap');

declare const module: {
  hot: { accept: () => void; dispose: (argument: () => Promise<void>) => void };
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      snapshot: true,
    },
  );

  const configService = app.get(ConfigService<Configs, true>);

  // ======================================================
  // security and middlewares
  // ======================================================

  app.enable('trust proxy');
  app.set('etag', 'strong');
  app.use(
    bodyParser.json({ limit: '10mb' }),
    bodyParser.urlencoded({ limit: '10mb', extended: true }),
  );

  if (!HelperService.isProd()) {
    app.use(compression());
    app.use(helmet());
    app.enableCors({
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      maxAge: 3600,
      origin: configService.get('app.allowedOrigins', { infer: true }),
    });
  }

  app.enableShutdownHooks();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // =====================================================
  // configure global pipes, filters, interceptors
  // =====================================================

  const globalPrefix = configService.get<string>('app.prefix', { infer: true });

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  app.useGlobalPipes(new ValidationPipe(AppUtils.validationPipeOptions()));

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // =========================================================
  // configure shutdown hooks
  // =========================================================

  app.enableShutdownHooks();

  AppUtils.killAppWithGrace(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const port =
    process.env.PORT ?? configService.get<number>('app.port', { infer: true })!;

  await app.listen(port);

  const appUrl = `http://localhost:${port}/${globalPrefix}`;

  logger.log(`==========================================================`);
  logger.log(`🚀 Application is running on: ${chalk.green(appUrl)}`);

  logger.log(`==========================================================`);
  logger.log(
    `🚦 Accepting request only from: ${chalk.green(
      `${configService.get('app.allowedOrigins', { infer: true }).toString()}`,
    )}`,
  );
}

try {
  (async () => await bootstrap())();
} catch (error) {
  logger.error(error);
}
