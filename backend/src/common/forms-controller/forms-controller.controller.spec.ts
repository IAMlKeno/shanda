import { Test, TestingModule } from '@nestjs/testing';
import { FormsControllerController } from './forms-controller.controller';

describe('FormsControllerController', () => {
  let controller: FormsControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsControllerController],
    }).compile();

    controller = module.get<FormsControllerController>(FormsControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
