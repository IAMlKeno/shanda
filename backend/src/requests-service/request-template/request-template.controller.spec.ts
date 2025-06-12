import { Test, TestingModule } from '@nestjs/testing';
import { RequestTemplateController } from './request-template.controller';

describe('RequestTemplateController', () => {
  let controller: RequestTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestTemplateController],
    }).compile();

    controller = module.get<RequestTemplateController>(RequestTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
