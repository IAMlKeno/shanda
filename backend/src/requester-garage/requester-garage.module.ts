import { Module } from '@nestjs/common';
import { RequesterGarageService } from './services/requester-garage.service';
import { RequesterGarageController } from './controllers/requester-garage.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { vehicleGarage } from 'src/mvc/models';
import { RequesterGarageHandler } from './handlers/requester-garage.handler';

@Module({
  controllers: [RequesterGarageController],
  providers: [RequesterGarageService, RequesterGarageHandler],
  imports: [
    SequelizeModule.forFeature([vehicleGarage]),
  ],
})
export class RequesterGarageModule {}
