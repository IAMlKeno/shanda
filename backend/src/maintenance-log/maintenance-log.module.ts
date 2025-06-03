import { Module } from '@nestjs/common';
import { MaintenanceLogController } from './controllers/maintenance-log.controller';
import { MaintenanceLogService } from './services/maintenance-log.service';
import { maintenanceLog } from 'src/mvc/models';
import { SequelizeModule } from '@nestjs/sequelize';
import { MaintenanceLogHandler } from './handlers/maintenance-log.handler';

@Module({
  controllers: [MaintenanceLogController],
  providers: [MaintenanceLogService, MaintenanceLogHandler],
  imports: [
    SequelizeModule.forFeature([maintenanceLog]),
  ],
  exports: [
    SequelizeModule,
  ],
})
export class MaintenanceLogModule {}
