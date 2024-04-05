import type { ConfigType } from '@nestjs/config';
import { app } from './configs/app.config';
export interface Config {
  app: ConfigType<typeof app>;
}
