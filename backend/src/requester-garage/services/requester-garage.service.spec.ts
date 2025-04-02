import { Test, TestingModule } from '@nestjs/testing';
import { RequesterGarageService } from './requester-garage.service';

describe('RequesterGarageService', () => {
  let service: RequesterGarageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequesterGarageService],
    }).compile();

    service = module.get<RequesterGarageService>(RequesterGarageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
