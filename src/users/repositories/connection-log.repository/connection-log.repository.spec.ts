import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionLogRepository } from './connection-log.repository';

describe('ConnectionRepositoryService', () => {
  let service: ConnectionLogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionLogRepository],
    }).compile();

    service = module.get<ConnectionLogRepository>(ConnectionLogRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
