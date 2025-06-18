import { Controller, HttpStatus } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { MaintenanceLogListResponse, MaintenanceLogRequest, MaintenanceLogResponse } from '../entities/maintenance-log.entity';
import { VehicleLogDto } from '../dto/maintenance-log.dto';
import { MaintenanceLogHandler } from '../handlers/maintenance-log.handler';

@Controller('maintenance-log')
export class MaintenanceLogController extends BaseController<MaintenanceLogHandler, MaintenanceLogRequest, VehicleLogDto, MaintenanceLogResponse, MaintenanceLogListResponse> {

  constructor(handler: MaintenanceLogHandler) { super(handler); }

  createDtoFromRequest(request: MaintenanceLogRequest): VehicleLogDto {
    return new VehicleLogDto(request);
  }
  createResponseFromDto(dto: VehicleLogDto): MaintenanceLogResponse {
    return new MaintenanceLogResponse(dto);
  }
  createResponseList(list: VehicleLogDto[], total: number): MaintenanceLogListResponse {
    return new MaintenanceLogListResponse(list.map((log) => log.info), total);
  }
  
}