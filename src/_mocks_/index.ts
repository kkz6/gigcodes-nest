import { createMock } from '@golevelup/ts-jest';
import { CacheService } from '@lib/cache';

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
