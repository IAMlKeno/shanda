import { Controller, HttpStatus } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { HostGarageDto } from '../dto/host-garage.dto';
import { HostGarageHandler } from '../handlers/host-garage.handler';
import { HostGarageListResponse, HostGarageRequest, HostGarageResponse } from '../entities/host-garage.entity';

@Controller('host-garage')
export class HostGarageController extends BaseController<HostGarageHandler, HostGarageRequest, HostGarageDto, HostGarageResponse, HostGarageListResponse> {

  constructor(handler: HostGarageHandler) { super(handler); }

  createDtoFromRequest(request: HostGarageRequest): HostGarageDto {
    return new HostGarageDto(request);
  }
  createResponseFromDto(dto: HostGarageDto): HostGarageResponse {
    return new HostGarageResponse(dto);
  }
  createResponseList(list: HostGarageDto[], total: number): HostGarageListResponse {
    return new HostGarageListResponse(list.map((garage) => garage.garage), total);
  }
  
}
