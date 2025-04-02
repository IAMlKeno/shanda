import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceLogService } from './maintenance-log.service';

describe('MaintenanceLogService', () => {
  let service: MaintenanceLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceLogService],
    }).compile();

    service = module.get<MaintenanceLogService>(MaintenanceLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
