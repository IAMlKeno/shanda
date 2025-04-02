import { Module } from '@nestjs/common';
import { MaintenanceLogController } from './controllers/maintenance-log.controller';
import { MaintenanceLogService } from './services/maintenance-log.service';
import { maintenanceLog } from 'src/mvc/models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [MaintenanceLogController],
  providers: [MaintenanceLogService],
  imports: [
    SequelizeModule.forFeature([maintenanceLog]),
  ],
})
export class MaintenanceLogModule {}
