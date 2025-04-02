import { Controller } from '@nestjs/common';
import { MaintenanceLogService } from '../services/maintenance-log.service';

@Controller('maintenance-log')
export class MaintenanceLogController {
  constructor(private readonly maintenanceLogService: MaintenanceLogService) {}
}
