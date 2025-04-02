import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './controllers/profiles.controller';
import { ProfilesService } from './services/profiles.service';
import { GarageOwnerService } from './services/owner.service';
import { ProviderService } from './services/provider.service';
import { RequesterService } from './services/requester.service';

describe('ProfilesController', () => {
  let controller: ProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
        providers: [RequesterService, ProviderService, GarageOwnerService],
      
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
