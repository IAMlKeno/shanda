import { forwardRef, Module } from '@nestjs/common';
import { RequesterGarageService } from './services/requester-garage.service';
import { RequesterGarageController } from './controllers/requester-garage.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { vehicleGarage } from 'src/mvc/models';
import { RequesterGarageHandler } from './handlers/requester-garage.handler';
import { VehicleHandler } from 'src/vehicles/handlers/vehicle.handler';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';

@Module({
  controllers: [RequesterGarageController],
  providers: [
    RequesterGarageService,
    RequesterGarageHandler,
    VehicleHandler,
    VehiclesService,
  ],
  imports: [
    SequelizeModule.forFeature([vehicleGarage]),
    forwardRef(() => VehiclesModule),
  ],
  exports: [
    SequelizeModule,
  ],
})
export class RequesterGarageModule {}
