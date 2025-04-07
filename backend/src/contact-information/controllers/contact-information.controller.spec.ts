import { Test, TestingModule } from '@nestjs/testing';
import { ContactInformationController } from './contact-information.controller';
import { ContactInformationHandler } from '../handlers/contact-information.handler';
import { HttpStatus } from '@nestjs/common';
import { ContactInformationDto } from '../dto/contact-information.dto';
import { getRandomUuid } from 'src/utils/misc.utils';

describe('ContactInformationController', () => {
  let controller: ContactInformationController;
  const mockContactInformationHandler = {
    create: jest.fn(),
    update: jest.fn(),
    getAll: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
    getCustom: jest.fn(),
    getAllCustom: jest.fn(),
    deleteCustom: jest.fn(),
    updateMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactInformationController],
      providers: [
        {
          provide: ContactInformationHandler,
          useValue: mockContactInformationHandler,
        },
      ],
    }).compile();

    controller = module.get<ContactInformationController>(ContactInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new contact information', async () => {
    const mockContactInfoDto: ContactInformationDto = {
      info: {
        // ... your sample contact info data
        phone: '123-456-7890',
        email: 'test@example.com',
      },
    };
    const someUuid = getRandomUuid();
    const mockCreatedContactInfoDto: ContactInformationDto = {
      info: {
        id: someUuid,
        ...mockContactInfoDto.info,
      },
    };
    mockContactInformationHandler.create.mockResolvedValue(mockCreatedContactInfoDto);

    const result = await controller.create(mockContactInfoDto);
    expect(result.status).toBe(HttpStatus.CREATED);
    expect(mockContactInformationHandler.create).toHaveBeenCalledWith(mockContactInfoDto);
  });

  // Add more tests for other controller methods (get, getAll, update, delete) 
  // following a similar pattern:

  // 1. Define mock data for the DTO 
  // 2. Set up mock behavior for the ContactInformationHandler method being called
  // 3. Call the controller method 
  // 4. Assert that the returned value and the handler's behavior are as expected 

});
