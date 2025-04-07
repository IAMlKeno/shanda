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
    return { ...dto.garage, statusCode: dto.garage.id ? HttpStatus.FOUND : HttpStatus.NOT_FOUND };
  }
  createResponseList(list: HostGarageDto[], total: number): HostGarageListResponse {
    return {
      results: list.map((garage) => garage.garage),
      totalCount: total,
      count: list.length,
      statusCode: list.length == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK,
     };
  }
  
}
