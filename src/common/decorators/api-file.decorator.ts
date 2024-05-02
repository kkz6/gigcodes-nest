import { applyDecorators, UseInterceptors } from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import type {
  MulterField,
  MulterOptions,
} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

interface ApiFileOptions {
  fieldName?: string;
  required?: boolean;
  localOptions?: MulterOptions;
}

interface ApiFilesOptions extends ApiFileOptions {
  maxCount?: number;
}

/**
 * It's a decorator that uses the Multer FileInterceptor to intercept a file upload and save it to the
 * server
 * @param options_ - IApiFileOptions - The options for the decorator.
 * @returns A function that returns a decorator.
 */
export function ApiFile(options_?: ApiFileOptions) {
  const options = {
    fieldName: 'file',
    required: false,
    ...options_,
  } satisfies ApiFilesOptions;

  return applyDecorators(
    UseInterceptors(FileInterceptor(options.fieldName, options.localOptions)),
  );
}

/**
 * It adds the `@UseInterceptors(FilesInterceptor(...))` decorator to the route handler, and adds the
 * `@ApiConsumes("multipart/form-data")` and `@ApiBody({...})` decorators to the route handler
 * @param options_ - The options for the decorator.
 * @returns A function that returns a decorator.
 */
export function ApiFiles(options_?: ApiFilesOptions) {
  const options = {
    fieldName: 'files',
    required: false,
    maxCount: 10,
    ...options_,
  } satisfies ApiFilesOptions;

  return applyDecorators(
    UseInterceptors(
      FilesInterceptor(
        options.fieldName,
        options.maxCount,
        options.localOptions,
      ),
    ),
  );
}

/**
 * It takes an array of MulterFields and returns a decorator that will add the appropriate OpenAPI
 * schema to the endpoint
 * @param options - An array of MulterFields.
 * @param localOptions - These are the options that are passed to
 * multer.
 */

export function ApiFileFields(
  options: (MulterField & { required?: boolean })[],
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileFieldsInterceptor(options, localOptions)),
  );
}
