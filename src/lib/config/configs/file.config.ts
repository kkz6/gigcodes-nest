import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export enum FileDriver {
  LOCAL = 'local',
  S3 = 's3',
  S3_PRESIGNED = 's3-presigned',
}

export const fileConfigValidationSchema = {
  FILE_DRIVER: Joi.string()
    .optional()
    .default(FileDriver.LOCAL)
    .valid(...Object.values(FileDriver)),
  ACCESS_KEY_ID: Joi.string().required(),
  SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_DEFAULT_S3_BUCKET: Joi.string().required(),
  AWS_DEFAULT_S3_URL: Joi.string().required(),
  AWS_S3_REGION: Joi.string().required(),
};

export const file = registerAs('file', () => ({
  driver: process.env.FILE_DRIVER,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  awsDefaultS3Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
  awsDefaultS3Url: process.env.AWS_DEFAULT_S3_URL,
  awsS3Region: process.env.AWS_S3_REGION,
  maxFileSize: 5242880, // 5mb
}));
