import path from 'node:path';

import process from 'node:process';
import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        fallbacks: {
          'np-*': 'np',
          'en-*': 'en',
          'np_*': 'np',
          'en_*': 'en',
          en: 'en',
          np: 'np',
        },
        logging: true,
        loaderOptions: {
          path: path.join(__dirname, '../../resources/i18n/'),
          watch: true,
          includeSubfolders: true,
        },
        typesOutputPath: path.join(
          `${process.cwd()}/src/generated/i18n-generated.ts`,
        ),
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],
  exports: [I18nModule],
})
export class NestI18nModule {}
