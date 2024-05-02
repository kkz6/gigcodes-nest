import { IsArray } from 'class-validator';
import type { PaginationAbstractResponse } from '../interfaces';

export class CursorMeta {
  /**
   * @example AdVxY2F0ZWdvcnlfaWQ9MjMx
   */
  nextCursor!: string;

  /**
   * @example false
   */
  hasNextPage!: boolean;

  /**
   * @example true
   */
  hasPreviousPage!: boolean;

  /**
   * @example "lorem ipsum"
   */
  search?: string;
}

export class CursorPaginationResponse<T>
  implements PaginationAbstractResponse<T, CursorMeta>
{
  @IsArray()
  // @ApiProperty({ isArray: true })
  readonly data!: T[];

  // @ApiProperty({ type: () => CursorMeta })
  readonly meta!: CursorMeta;
}
