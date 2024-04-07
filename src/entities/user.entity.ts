import type { FilterQuery } from '@mikro-orm/mysql';
import {
  BeforeCreate,
  BeforeUpdate,
  BeforeUpsert,
  Entity,
  Enum,
  EventArgs,
  Property,
  wrap,
} from '@mikro-orm/mysql';
import { Roles } from '@common/@types';
import { BaseEntity } from '@common/database';
import { HelperService } from '@common/helpers';

@Entity()
export class User extends BaseEntity {
  @Property()
  firstName!: string;

  @Property()
  middleName?: string;

  @Property()
  lastName!: string;

  @Property({ index: true, unique: true })
  username!: string;

  @Property({ index: true, unique: true })
  email!: string;

  @Property({ columnType: 'text' })
  bio?: string;

  @Property({ columnType: 'text' })
  avatar?: string;

  @Property({ hidden: true, columnType: 'text', lazy: true })
  password!: string;

  @Property()
  twoFactorSecret?: string;

  @Property()
  isTwoFactorEnabled? = false;

  @Enum({ items: () => Roles, array: true })
  roles?: Roles[] = [Roles.AUTHOR];

  @Property({ index: true, unique: true })
  mobileNumber?: string;

  @Property()
  isVerified? = false;

  @Property()
  lastLogin? = new Date();

  constructor(data?: Pick<User, 'idx'>) {
    super();
    Object.assign(this, data);
  }

  toJSON() {
    const o = wrap<User>(this).toObject();

    o.avatar =
      this.avatar ||
      `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}&background=0D8ABC&color=fff`;

    return o;
  }

  @BeforeCreate()
  @BeforeUpdate()
  @BeforeUpsert()
  async hashPassword(arguments_: EventArgs<this>) {
    if (arguments_.changeSet?.payload?.password)
      this.password = await HelperService.hashString(this.password);
  }
}

type A = FilterQuery<User>;

export const x: A = {
  username: '1',
  idx: '1',
};
