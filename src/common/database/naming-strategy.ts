import { NamingStrategy, UnderscoreNamingStrategy } from '@mikro-orm/core';
import pluralize from 'pluralize';

export class LaravelLikeNamingStrategy
  extends UnderscoreNamingStrategy
  implements NamingStrategy
{
  // Pluralize and convert class names to snake_case for table names
  classToTableName(entityName: string): string {
    return pluralize(super.classToTableName(entityName));
  }

  // Convert field names to snake_case for column names
  propertyToColumnName(propertyName: string): string {
    return super.propertyToColumnName(propertyName);
  }

  // Convert field names to snake_case for join column names
  joinColumnName(propertyName: string): string {
    return super.joinColumnName(propertyName);
  }

  // Pluralize and convert to snake_case for join table names
  joinTableName(
    sourceEntity: string,
    targetEntity: string,
    propertyName: string,
  ): string {
    const tableName = super.joinTableName(
      sourceEntity,
      targetEntity,
      propertyName,
    );
    return pluralize(tableName);
  }
}
