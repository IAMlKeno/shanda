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
    return { ...dto.request, statusCode: dto.request.id ? HttpStatus.FOUND : HttpStatus.NOT_FOUND };
  }
  createResponseList(list: VehicleLogDto[], total: number): MaintenanceLogListResponse {
    return {
      results: list.map((log) => log.request),
      totalCount: total,
      count: list.length,
      statusCode: list.length == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
     };
  }
  
}