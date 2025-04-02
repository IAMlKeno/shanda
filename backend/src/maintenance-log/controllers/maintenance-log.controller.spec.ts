import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceLogService } from '../services/maintenance-log.service';
import { MaintenanceLogController } from './maintenance-log.controller';

describe('MaintenanceLogController', () => {
  let controller: MaintenanceLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceLogController],
      providers: [MaintenanceLogService],
    }).compile();

    controller = module.get<MaintenanceLogController>(MaintenanceLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
