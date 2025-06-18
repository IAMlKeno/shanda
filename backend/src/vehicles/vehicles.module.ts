import { forwardRef, Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesController } from './controllers/vehicles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { vehicle } from 'src/mvc/models';
import { VehicleHandler } from './handlers/vehicle.handler';
import { MaintenanceLogModule } from 'src/maintenance-log/maintenance-log.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, VehicleHandler],
  imports: [
    SequelizeModule.forFeature([vehicle]),
    forwardRef(() => MaintenanceLogModule),
    forwardRef(() => ProfilesModule),
  ],
  exports: [
    SequelizeModule,
  ],
})
export class VehiclesModule {}
