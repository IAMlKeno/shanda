import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from '../services/profiles.service';
import { ProviderService } from './provider.service';
import { RequesterService } from './requester.service';

describe('ProfilesService', () => {
  let providerService: ProviderService;
  let requesterService: RequesterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderService, RequesterService],
    }).compile();

    providerService = module.get<ProviderService>(ProviderService);
    requesterService = module.get<RequesterService>(RequesterService);
  });

  it('should be defined [providerService]', () => {
    expect(providerService).toBeDefined();
  });

  it('should be defined [requesterService]', () => {
    expect(requesterService).toBeDefined();
  });
});
