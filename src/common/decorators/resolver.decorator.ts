import { applyDecorators } from '@nestjs/common';
import { Auth } from './auth.decorator';

/**
 * It takes a name and a boolean value and returns a decorator that applies the Controller, ApiTags,
 * and Auth decorators to the class
 * @param _name
 * @param secured - whether the controller should be secured
 * @returns A function that takes in a class and returns a class.
 */
export function GenericResolver(_name: string, secured = true) {
  const decsToApply: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    [];

  if (secured) decsToApply.push(Auth());

  return applyDecorators(...decsToApply);
}
