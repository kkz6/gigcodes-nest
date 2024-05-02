import { readFileSync } from 'fs';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { NamingStrategy } from '@mikro-orm/core';

export class CustomMigrationGenerator extends TSMigrationGenerator {
  constructor(driver: any, namingStrategy: NamingStrategy, options: any) {
    super(driver, namingStrategy, options);
  }

  generateMigrationFile(className: string, _diff: any = {}): string {
    // Transform the original class name into the desired format
    const formattedClassName = this.formatClassNameForFile(className);
    // Extract and format table name directly from the class name
    const tableName = this.extractAndFormatTableName(className);

    const stubContent = readFileSync(
      'src/common/stubs/migration.stub',
      'utf-8',
    );
    return stubContent
      .replace(/\{className}/g, formattedClassName)
      .replace(/\{tableName}/g, tableName);
  }

  private formatClassNameForFile(className: string): string {
    // Assuming the original class name is like 'Migration20240407042217_create_users_table'
    // We want it to be 'migration_create_users_table'
    const match = className.match(/Migration\d+_create_(.*)_table/);
    if (match && match[1]) {
      // If it follows the expected pattern
      return `migration_create_${match[1]}_table`;
    } else {
      // If the class name does not follow the expected pattern, return as is or handle accordingly
      return className;
    }
  }

  private extractAndFormatTableName(className: string): string {
    // Assuming the class name might still be in original format and trying to extract table name directly
    const match = className.match(/create_(.*)_table/);
    if (match && match[1]) {
      // Directly use the extracted table name
      return match[1];
    } else {
      // Use the naming strategy as a fallback
      return this.namingStrategy.classToTableName(className);
    }
  }
}
