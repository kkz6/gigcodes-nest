import { Migration } from '@mikro-orm/migrations';

export class migration_create_users_table extends Migration {
  knex = this.getKnex();

  async up(): Promise<void> {
    return this.knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.uuid('idx');
      table.string('firstName');
      table.string('middleName').nullable();
      table.string('lastName').nullable();
      table.string('username');
      table.string('email');
      table.string('bio').nullable();
      table.string('avatar').nullable();
      table.string('password');
      table.string('twoFactorSecret');
      table.boolean('isTwoFactorEnabled');
      table.string('mobileNumber').nullable();
      table.boolean('isVerified').nullable();
      table.timestamp('lastLogin').nullable();
      table.timestamp('createdAt');
      table.timestamp('updatedAt');
      table.timestamp('deletedAt').nullable();
    });
  }

  async down(): Promise<void> {
    return this.knex.schema.dropTableIfExists('users');
  }
}
