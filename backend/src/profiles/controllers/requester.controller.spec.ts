// src/profiles/controllers/requester.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RequesterController } from './requester.controller';
import { ProfileHandler } from '../handlers/profiles.handler';

// Mock ProfileHandler
const mockProfileHandler = {
  requesterService: {
    getMyGarage: jest.fn(),
    // ... mock other methods used by the controller
  },
};

describe('RequesterController', () => {
  let controller: RequesterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequesterController],
      providers: [
        {
          provide: ProfileHandler, 
          useValue: mockProfileHandler,
        },
      ],
    }).compile();

    controller = module.get<RequesterController>(RequesterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a user\'s garage', async () => {
    const mockGarageData = {}; // Sample garage data 
    mockProfileHandler.requesterService.getMyGarage.mockResolvedValue(mockGarageData);

    const req = {  }; // Mock request object if needed
    const result = await controller.getMyGarage(req);

    expect(result).toEqual(mockGarageData);
    expect(mockProfileHandler.requesterService.getMyGarage).toHaveBeenCalledWith('from-a-token');
  });

  // Add more tests for other controller methods 
});