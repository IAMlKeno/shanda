import { Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesController } from './controllers/vehicles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { vehicle } from 'src/mvc/models';
import { VehicleHandler } from './handlers/vehicle.handler';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, VehicleHandler],
  imports: [
    SequelizeModule.forFeature([vehicle]),
  ],
  exports: [
    SequelizeModule,
  ],
})
export class VehiclesModule {}
