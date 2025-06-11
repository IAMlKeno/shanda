import { forwardRef, Module } from '@nestjs/common';
import { ProfilesController } from './controllers/profiles.controller';
import { RequesterService } from './services/requester.service';
import { ProviderService } from './services/provider.service';
import { GarageOwnerService } from './services/owner.service';
import { RequesterController } from './controllers/requester.controller';
import { ProviderController } from './controllers/provider.controller';
import { GarageOwnerController } from './controllers/garage-owner.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { garageOwner, request, requester, serviceProvider } from 'src/mvc/models';
import { RequesterGarageHandler } from 'src/requester-garage/handlers/requester-garage.handler';
import { ProfileHandler } from './handlers/profiles.handler';
import { RequesterGarageModule } from 'src/requester-garage/requester-garage.module';
import { RequesterGarageService } from 'src/requester-garage/services/requester-garage.service';
import { VehicleHandler } from 'src/vehicles/handlers/vehicle.handler';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';
import { RequestsHandler } from 'src/requests-service/handlers/requests.handler';
import { RequestsService } from 'src/requests-service/requests.service';

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
    RequesterGarageService,
    RequestsHandler,
    RequestsService,
    VehicleHandler,
    VehiclesService,
    ProfileHandler,
    RequesterController,
    ProviderController,
    GarageOwnerController,
  ],
  imports: [
    SequelizeModule.forFeature([
      requester,
      garageOwner,
      serviceProvider,
      request,
    ]),
    forwardRef(() => RequesterGarageModule),
    forwardRef(() => VehiclesModule),
  ],
  exports: [
    SequelizeModule,
    ProfileHandler,
    RequesterController,
    GarageOwnerController,
    ProviderController,
  ],
})
export class ProfilesModule {}
