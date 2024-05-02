import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/graphql';

export class UserRegistrationDto extends OmitType(CreateUserDto, [
  'roles',
] as const) {}
