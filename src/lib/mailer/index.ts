import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { Server } from '@common/@types';
import { TemplateEngine } from '@common/@types';
import { MailModule } from './mailer.module';

@Global()
@Module({
  imports: [
    MailModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Configs, true>) => ({
        credentials: {
          type: configService.get<string>('mail.type', {
            infer: true,
          }) as Server.SMTP,
          host: configService.get<string>('mail.host', { infer: true }),
          port: configService.get<number>('mail.port', { infer: true }),
          username: configService.get<string>('mail.username', { infer: true }),
          password: configService.get<string>('mail.password', { infer: true }),
        },
        previewEmail: configService.get<boolean>('mail.previewEmail', {
          infer: true,
        }),
        templateDir: configService.get<string>('mail.templateDir', {
          infer: true,
        }),
        templateEngine: TemplateEngine.ETA,
      }),
    }),
  ],
  exports: [MailModule],
})
export class NestMailModule {}
