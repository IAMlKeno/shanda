import { Test, TestingModule } from '@nestjs/testing';
import { BaseDbService } from './data/base.service';

describe('BaseService', () => {
  let service: BaseDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseDbService],
    }).compile();

    service = module.get<BaseDbService>(BaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
