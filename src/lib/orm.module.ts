import { MikroOrmModule } from '@mikro-orm/nestjs';
import { defineConfig } from '@mikro-orm/mysql';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { baseOptions } from '@common/database/orm.config';

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Configs, true>) =>
        defineConfig({
          ...baseOptions,
          host: configService.get<number>('database.host', { infer: true }),
          port: configService.get<number>('database.port', { infer: true }),
          dbName: configService.get<string>('database.dbName', { infer: true }),
          user: configService.get<string>('database.user', { infer: true }),
          password: configService.get<string | null>('database.password', {
            infer: true,
          }),
        }),
    }),
    MikroOrmModule.forFeature({
      entities: baseOptions.entities,
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
