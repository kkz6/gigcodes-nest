import { Roles } from '@common/@types';
import { createMock } from '@golevelup/ts-jest';
import { CacheService } from '@lib/cache';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { User } from 'entities/user.entity';
import { of } from 'rxjs';

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
  roles: [Roles.ADMIN],
};

export const loggedInUser = new User(mockedUser);

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
export const mockContext = createMock<ExecutionContext>({});

export const mockNext = createMock<CallHandler>({
  handle: jest.fn(() => of({})),
});
