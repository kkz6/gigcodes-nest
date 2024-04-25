import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import mime from 'mime-types';
import { v1 as uuid } from 'uuid';

import { ConfigService } from '@nestjs/config';
import { File } from '@common/@types';

@Injectable()
export class FileService {
  private readonly s3: S3;

  public uuid(): string {
    return uuid();
  }

  public fileName(ext: string): string {
    return this.uuid() + '.' + ext;
  }

  constructor(public readonly configService: ConfigService<Configs, true>) {
    this.s3 = new AWS.S3({
      region: this.configService.get<string>('file.awsS3Region', {
        infer: true,
      }),
      credentials: {
        secretAccessKey: this.configService.get<string>('file.accessKeyId', {
          infer: true,
        }),
        accessKeyId: this.configService.get<string>('file.secretAccessKey', {
          infer: true,
        }),
      },
    });
  }

  async uploadImage(file: File): Promise<string> {
    const fileName = this.fileName(<string>mime.extension(file.mimetype));
    const key = 'images/' + fileName;
    await this.s3
      .upload({
        Bucket: this.configService.get<string>('file.awsDefaultS3Bucket', {
          infer: true,
        }),
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
      })
      .promise();

    return key;
  }
}
