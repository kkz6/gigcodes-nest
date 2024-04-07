import {
  Body,
  DefaultValuePipe,
  Get,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';

import { TokensService } from '@modules/token/tokens.service';
import { User } from '@entities';
import type { OtpLog } from '@entities';
import {
  Auth,
  GenericController,
  LoggedInUser,
  SwaggerResponse,
} from '@common/decorators';
import { OauthResponse } from '@common/@types';
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
  @ApiOperation({ summary: 'User Login' })
  login(@Body() loginDto: UserLoginDto): Observable<AuthenticationResponse> {
    return this.authService.login(loginDto);
  }
  @Post('reset-password')
  @SwaggerResponse({
    operation: 'Reset password',
    notFound: "Otp doesn't exist.",
    badRequest: 'Otp is expired.',
  })
  resetUserPassword(@Body() dto: ResetPasswordDto): Observable<User> {
    return this.authService.resetPassword(dto);
  }

  @Auth()
  @Put('forgot-password')
  @SwaggerResponse({
    operation: 'Forgot password',
    notFound: "Account doesn't exist.",
  })
  forgotPassword(@Body() dto: SendOtpDto): Observable<OtpLog> {
    return this.authService.forgotPassword(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() _request: Request) {
    // the google auth redirect will be handled by passport
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @LoggedInUser()
    user: OauthResponse,
    @Res() response: NestifyResponse,
  ) {
    return this.authService.OauthHandler({ response, user });
  }

  // this simulates a frontend url for testing oauth login
  @Get('oauth/login')
  oauthMock(@Query() query: { token: string }) {
    return { message: 'successfully logged', token: query.token };
  }

  @Post('verify-otp')
  @SwaggerResponse({
    operation: 'Verify otp',
    notFound: "Otp doesn't exist.",
    badRequest: 'Otp is expired.',
  })
  verifyOtp(@Body() dto: OtpVerifyDto): Observable<User> {
    return this.authService.verifyOtp(dto);
  }

  @Auth()
  @Post('change-password')
  @SwaggerResponse({
    operation: 'Change password',
    badRequest: 'Username and password provided does not match.',
  })
  changePassword(
    @Body() dto: ChangePasswordDto,
    @LoggedInUser() user: User,
  ): Observable<User> {
    return this.authService.changePassword(dto, user);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @Post('token/refresh')
  refresh(@Body() body: RefreshTokenDto): Observable<any> {
    return this.tokenService
      .createAccessTokenFromRefreshToken(body.refreshToken)
      .pipe(map((token) => ({ token })));
  }

  @Auth()
  @ApiOperation({ summary: 'Logout user' })
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
