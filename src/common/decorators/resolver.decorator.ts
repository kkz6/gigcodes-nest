import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { capitalize } from 'helper-fns';
import { Auth } from './auth.decorator';

/**
 * It takes a name and a boolean value and returns a decorator that applies the Controller, ApiTags,
 * and Auth decorators to the class
 * @param name - The name of the controller.
 * @param secured - whether the controller should be secured
 * @returns A function that takes in a class and returns a class.
 */
export function GenericResolver(name: string, secured = true) {
  const decsToApply: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    [ApiTags(capitalize(name))];

  if (secured) decsToApply.push(Auth());

  return applyDecorators(...decsToApply);
}
