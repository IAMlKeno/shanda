import { Module } from '@nestjs/common';
import { ProfilesController } from './controllers/profiles.controller';
import { RequesterService } from './services/requester.service';
import { ProviderService } from './services/provider.service';
import { GarageOwnerService } from './services/owner.service';
import { RequesterController } from './controllers/requester.controller';
import { ProviderController } from './controllers/provider.controller';
import { GarageOwnerController } from './controllers/garage-owner.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { garageOwner, requester, serviceProvider } from 'src/mvc/models';
import { RequesterGarageHandler } from 'src/requester-garage/handlers/requester-garage.handler';
import { ProfileHandler } from './handlers/profiles.handler';

@Module({
  controllers: [
    ProfilesController,
    RequesterController,
    ProviderController,
    GarageOwnerController,
  ],
  providers: [
    RequesterService,
    ProviderService,
    GarageOwnerService,
    RequesterGarageHandler,
    ProfileHandler,
  ],
  imports: [
    SequelizeModule.forFeature([
      requester,
      garageOwner,
      serviceProvider,
    ]),
  ],
})
export class ProfilesModule {}
