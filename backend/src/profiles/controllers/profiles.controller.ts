import { Controller } from '@nestjs/common';
import { ProfileHandler } from '../handlers/profiles.handler';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileHandler: ProfileHandler) {}

  async createProfiles(data: any): Promise<void> {
    Promise.all([
      this.profileHandler.garageOwnerService.create(data),
      this.profileHandler.providerService.create(data),
      this.profileHandler.requesterService.create(data),
    ]);
  }
}
