import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { TokensService } from '@modules/token/tokens.service';
import { RefreshTokensRepository } from '@modules/token/refresh-tokens.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, TokensService, RefreshTokensRepository, JwtStrategy],
  exports: [AuthService, JwtStrategy, TokensService, RefreshTokensRepository],
})
export class AuthModule {}
