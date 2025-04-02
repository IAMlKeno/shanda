import { Module } from '@nestjs/common';
import { HostGarageService } from './services/host-garage.service';
import { HostGarageController } from './controllers/host-garage.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { garage, garageOwner } from 'src/mvc/models';
import { HostGarageHandler } from './handlers/host-garage.handler';

@Module({
  controllers: [HostGarageController],
  providers: [HostGarageService, HostGarageHandler],
  imports: [
    SequelizeModule.forFeature([garageOwner, garage]),
  ],
})
export class HostGarageModule {}
