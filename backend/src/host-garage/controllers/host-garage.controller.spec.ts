import { Test, TestingModule } from '@nestjs/testing';
import { HostGarageController } from './host-garage.controller';
import { HostGarageService } from '../services/host-garage.service';

describe('HostGarageController', () => {
  let controller: HostGarageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostGarageController],
      providers: [HostGarageService],
    }).compile();

    controller = module.get<HostGarageController>(HostGarageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
