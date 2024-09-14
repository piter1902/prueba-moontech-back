import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionLogService } from './connection-log.service';

describe('ConnectionService', () => {
  let service: ConnectionLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionLogService],
    }).compile();

    service = module.get<ConnectionLogService>(ConnectionLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
