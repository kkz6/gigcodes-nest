import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from '@modules/user/user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserResolver, UserService],
  exports: [UserService, UserModule],
})
export class UserModule {}
