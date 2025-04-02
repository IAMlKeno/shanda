import { Test, TestingModule } from '@nestjs/testing';
import { RequesterGarageController } from './requester-garage.controller';
import { RequesterGarageService } from '../services/requester-garage.service';

describe('RequesterGarageController', () => {
  let controller: RequesterGarageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequesterGarageController],
      providers: [RequesterGarageService],
    }).compile();

    controller = module.get<RequesterGarageController>(RequesterGarageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
