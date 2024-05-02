import { IsBoolean, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsDateField, IsStringField, ToBoolean } from '@common/decorators';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export abstract class PaginationDto {
  /**
   * From date filter
   */

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateField()
  from?: Date;

  /**
   * From date filter
   */
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateField()
  to?: Date;

  /**
   *  The search query
   */
  @Field(() => String, { nullable: true })
  @IsStringField({ required: false, minLength: 1, maxLength: 100 })
  search?: string;

  /**
   * The `withDeleted` property is a boolean flag that
   * indicates whether to include deleted items in the
   * results or not.
   */
  @IsOptional()
  @ToBoolean()
  @Field(() => Boolean, { nullable: true })
  @IsBoolean({
    message: i18nValidationMessage('validation.isDataType', {
      type: 'boolean',
    }),
  })
  withDeleted = false;

  /**
   * The `relations` property is used to specify which related
   * entities should be included in the query
   * results.
   */
  @Field(() => [String], { nullable: true })
  @IsStringField({ required: false, each: true })
  relations: string[] = [];

  /**
   * The `fields` property is used to specify which
   * entities field should be included in the query
   * results.
   */
  @Field(() => [String], { nullable: true })
  @IsStringField({ required: false, each: true })
  fields: string[] = [];
}
