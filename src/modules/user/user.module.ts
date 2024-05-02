import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from '@modules/user/user.resolver';

@Module({
  providers: [UserResolver, UserService],
  exports: [UserService, UserModule],
})
export class UserModule {}
