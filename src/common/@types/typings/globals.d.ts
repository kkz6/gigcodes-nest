import type { Config as ConfigInterface } from '@lib/config/config.interface';
import type { NextFunction, Request, Response } from 'express';

export {};

declare global {
  namespace Express {
    export interface Request {
      realIp?: string;
      idx?: string;
      ip: string;
      i18nLang?: string;
      ips: string[];
    }
  }

  export type Configs = ConfigInterface;

  // Using this allows is to quickly switch between express and fastify and others
  export type NestifyRequest = Request;
  export type NestifyResponse = Response;
  export type NestifyNextFunction = NextFunction;
}
