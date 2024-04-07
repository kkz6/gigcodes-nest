import { createMock } from '@golevelup/ts-jest';
import type { EntityManager } from '@mikro-orm/mysql';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Reflector } from '@nestjs/core';
import type { JwtService } from '@nestjs/jwt';
import { of } from 'rxjs';
import type { CacheService } from '@lib/cache/cache.service';
import { User } from '@entities';
import type { CursorPaginationDto } from '@common/dtos';
import type { BaseRepository } from '@common/database';
import { PaginationType } from '@common/@types';

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

export const mockResponse = createMock<NestifyResponse>();
export const mockCacheService = createMock<CacheService>();
export const mockConfigService = createMock<ConfigService>();
export const mockUserRepo = createMock<BaseRepository<User>>();
export const mockJwtService = createMock<JwtService>();
export const mockContext = createMock<ExecutionContext>({});
export const mockReflector = createMock<Reflector>();

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
