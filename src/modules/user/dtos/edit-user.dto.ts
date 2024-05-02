import { CreateUserDto } from './create-user.dto';
import { OmitType, PartialType } from '@nestjs/graphql';

export class EditUserDto extends PartialType(
  OmitType(CreateUserDto, ['username'] as const),
) {}
