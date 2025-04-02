import { Test, TestingModule } from '@nestjs/testing';
import { HostGarageService } from './host-garage.service';

describe('HostGarageService', () => {
  let service: HostGarageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostGarageService],
    }).compile();

    service = module.get<HostGarageService>(HostGarageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
