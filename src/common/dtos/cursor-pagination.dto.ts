import { Allow, IsBase64 } from 'class-validator';
import { PaginationType } from '@common/@types';
import { IsNumberField, IsStringField } from '@common/decorators';
import { validationI18nMessage } from '@lib/i18n';
import { PaginationDto } from './pagination.dto';
import { ArgsType, Field, Int } from '@nestjs/graphql';

// TODO: add filters

@ArgsType()
export class CursorPaginationDto extends PaginationDto {
  @Allow()
  @Field(() => PaginationType)
  type: PaginationType.CURSOR = PaginationType.CURSOR;

  /**
   * The cursor of the page you are requesting
   */
  @Field(() => String, { nullable: true })
  @IsStringField({ required: false })
  @IsBase64(
    {},
    {
      message: validationI18nMessage('validation.isDataType', {
        type: 'base64',
      }),
    },
  )
  after?: string;

  /**
   * Results page you want to retrieve (0..N)
   */
  @Field(() => Int, { nullable: true })
  @IsNumberField({ required: false })
  first = 10;
}
