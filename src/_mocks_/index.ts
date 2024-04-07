import { createMock } from '@golevelup/ts-jest';
import { ref, type EntityManager } from '@mikro-orm/mysql';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Reflector } from '@nestjs/core';
import type { JwtService } from '@nestjs/jwt';
import { of } from 'rxjs';
import type { CacheService } from '@lib/cache/cache.service';
import { RefreshToken, User } from '@entities';
import type { CursorPaginationDto } from '@common/dtos';
import type { BaseRepository } from '@common/database';
import { PaginationType } from '@common/@types';
import { Buffer } from 'node:buffer';
import path from 'node:path';
import type { File } from '@common/@types';
import { RefreshTokensRepository } from '@modules/token/refresh-tokens.repository';

export const mockedUser = {
  idx: 'idx',
  username: 'username',
  password: 'password',
  bio: 'bio',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  avatar: 'avatar',
  twoFactorSecret: 'someSecret',
  mobileNumber: '0123456789',
  isTwoFactorEnabled: true,
};

export const mockedProtocol = {
  loginMaxRetry: 5,
  loginAttemptnumbererval: 5,
  loginnumberervalUnit: 'm',
  otpExpiryInMinutes: 5,
};

export const mockFile = {
  fieldname: 'file',
  originalname: 'test.png',
  mimetype: 'text/png',
  buffer: Buffer.from(path.join(__dirname, '/../../test/test.png'), 'utf8'),
  size: 13_148,
} as File;

export const loggedInUser = new User(mockedUser);
export const mockEm = createMock<EntityManager>();

export const queryDto: CursorPaginationDto = {
  first: 10,
  search: '',
  relations: [],
  fields: [],
  type: PaginationType.CURSOR,
  withDeleted: false,
};

const payload = {
  xss: '<option><iframe></select><b><script>alert(1)</script>',
  test: 'test',
};
export const mockRequest = createMock<NestifyRequest>({
  query: {
    clearCache: 'true',
    ...payload,
  },
  params: payload,

  body: {
    ...payload,
    password: payload.xss,
  },
});

export const refreshTokenPayload = {
  jti: 1,
  sub: 1,
  iat: 1,
  exp: 1,
  aud: 'nestify',
  iss: 'nestify',
};

export const refreshToken = new RefreshToken({
  user: ref(loggedInUser),
  expiresIn: new Date(),
  isRevoked: false,
});

export const mockResponse = createMock<NestifyResponse>();
export const mockCacheService = createMock<CacheService>();
export const mockConfigService = createMock<ConfigService>();
export const mockUserRepo = createMock<BaseRepository<User>>();
export const mockJwtService = createMock<JwtService>();
export const mockContext = createMock<ExecutionContext>({});
export const mockReflector = createMock<Reflector>();
export const mockRefreshRepo = createMock<BaseRepository<RefreshToken>>();
export const mockRefreshTokenRepo = createMock<RefreshTokensRepository>();

export const mockNext = createMock<CallHandler>({
  handle: jest.fn(() => of({})),
});

// mocks for orm functions
// mockUserRepo.assign.mockImplementation((entity, dto) => {
//   return Object.assign(entity, dto);
// });

mockUserRepo.softRemoveAndFlush.mockImplementation((entity) => {
  Object.assign(entity, { deletedAt: new Date(), isDeleted: true });

  return of(entity);
});

// mockUserRepo.findOne.mockImplementation((options: FilterQuery<User>) => {
//   if ('idx' in options) {
//     return Promise.resolve({
//       user: mockedUser,
//       idx: options.idx,
//     });
//   } else if ('username' in options) {
//     return Promise.resolve({
//       ...mockedUser,
//       username: options.username,
//     });
//   }

//   return Promise.resolve(mockedUser);
// });
