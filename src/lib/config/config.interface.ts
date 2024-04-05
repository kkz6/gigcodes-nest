import type { ConfigType } from '@nestjs/config';
import { app, redis, throttle } from './configs';
export interface Config {
  app: ConfigType<typeof app>;
  redis: ConfigType<typeof redis>;
  throttle: ConfigType<typeof throttle>;
}
