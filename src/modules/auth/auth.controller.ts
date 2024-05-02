import {
  Body,
  DefaultValuePipe,
  ParseBoolPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { TokensService } from '@modules/token/tokens.service';
import type { OtpLog } from '@entities';
import { User } from '@entities';
import { Auth, GenericController, LoggedInUser } from '@common/decorators';
import type { AuthenticationResponse } from '@common/@types';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  OtpVerifyDto,
  RefreshTokenDto,
  ResetPasswordDto,
  SendOtpDto,
  UserLoginDto,
} from './dtos';

@GenericController('auth', false)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokensService,
  ) {}

  @Post('login')
  login(@Body() loginDto: UserLoginDto): Observable<AuthenticationResponse> {
    return this.authService.login(loginDto);
  }

  @Post('reset-password')
  resetUserPassword(@Body() dto: ResetPasswordDto): Observable<User> {
    return this.authService.resetPassword(dto);
  }

  @Auth()
  @Put('forgot-password')
  forgotPassword(@Body() dto: SendOtpDto): Observable<OtpLog> {
    return this.authService.forgotPassword(dto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: OtpVerifyDto): Observable<User> {
    return this.authService.verifyOtp(dto);
  }

  @Auth()
  @Post('change-password')
  changePassword(
    @Body() dto: ChangePasswordDto,
    @LoggedInUser() user: User,
  ): Observable<User> {
    return this.authService.changePassword(dto, user);
  }

  @Post('token/refresh')
  refresh(@Body() body: RefreshTokenDto): Observable<any> {
    return this.tokenService
      .createAccessTokenFromRefreshToken(body.refreshToken)
      .pipe(map((token) => ({ token })));
  }

  @Auth()
  @Post('logout')
  logout(
    @LoggedInUser() user: User,
    @Query('fromAll', new DefaultValuePipe(false), ParseBoolPipe)
    fromAll?: boolean,
    @Body() refreshToken?: RefreshTokenDto,
  ): Observable<User> {
    return fromAll
      ? this.authService.logoutFromAll(user)
      : this.authService.logout(user, refreshToken!.refreshToken);
  }
}
