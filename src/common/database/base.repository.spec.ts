import { createMock } from '@golevelup/ts-jest';
import type { EntityManager } from '@mikro-orm/mysql';
import { loggedInUser } from '@mocks';

import { User } from '@entities';
import { BaseRepository } from './base.repository';

describe('baseRepository', () => {
  const mockEm = createMock<EntityManager>({
    findAndCount: jest.fn().mockResolvedValue([[], 0]),
  });

  const userRepo = new BaseRepository(mockEm, User);

  it('should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  it('should softremove and flush', async () => {
    userRepo.softRemoveAndFlush(loggedInUser).subscribe((result) => {
      expect(result.deletedAt).toBeInstanceOf(Date);
    });
  });
});
