import { Test, TestingModule } from '@nestjs/testing';
import { ContactInformationService } from './contact-information.service';
import { getModelToken } from '@nestjs/sequelize';
import { contactInformation } from 'src/mvc/models';
import { ContactInformationDto } from '../dto/contact-information.dto';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { ContactInformationHandler } from '../handlers/contact-information.handler';

// Mock the Sequelize model 
const mockContactInformationModel = {
  create: jest.fn(),
  findByPk: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  // ... add mocks for other methods you use in your service
};
const mockService = () => ({
  get: jest.fn,
});

describe('ContactInformationService', () => {
  let service: ContactInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactInformationService,
        {
          provide: getModelToken(contactInformation),
          useValue: mockContactInformationModel,
          useFactory: mockService,
        },
        ContactInformationHandler,
      ],
    })
    .useMocker((token) => {
      
    })
    .compile();

    service = module.get<ContactInformationService>(ContactInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a new contact information', async () => {
  //   const mockDto: ContactInformationDto = { 
  //     // Populate with sample data for a ContactInformationDto 
  //   };

  //   const mockContactInfo = { ...mockDto, id: 'some-uuid-v4' }; 
  //   mockContactInformationModel.create.mockReturnValue(mockContactInfo);

  //   const createdContactInfo = await service.create(mockDto);
  //   expect(createdContactInfo).toEqual(mockContactInfo);
  //   expect(mockContactInformationModel.create).toHaveBeenCalledWith(mockDto); 
  // });
});
