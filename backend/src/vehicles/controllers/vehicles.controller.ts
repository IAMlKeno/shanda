import { Controller } from '@nestjs/common';
import { VehicleDto, VehicleRequest } from '../dto/vehicle.dto';
import { BaseController } from 'src/mvc/base/base.controller';
import { VehicleHandler } from '../handlers/vehicle.handler';
import { VehicleListResponse, VehicleResponse } from '../entities/vehicle.entity';

@Controller('vehicles')
export class VehiclesController extends BaseController<VehicleHandler, VehicleRequest, VehicleDto, VehicleResponse, VehicleListResponse> {

  constructor(handler: VehicleHandler) { super(handler); }

  createDtoFromRequest(request: VehicleRequest): VehicleDto {
    throw new Error('Method not implemented.');
  }
  createResponseFromDto(dto: VehicleDto): VehicleResponse {
    throw new Error('Method not implemented.');
  }
  createResponseList(list: VehicleDto[], total: number): VehicleListResponse {
    throw new Error('Method not implemented.');
  }
}
