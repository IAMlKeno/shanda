import { Controller } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { RequesterGarageHandler } from '../handlers/requester-garage.handler';
import { RequesterGarageDto } from '../dto/requester-garage.dto';
import { RequesterGarageListResponse, RequesterGarageResponse } from '../entities/requester-garage-response.entities';
import { AddVehicleToGarageRequest } from '../entities/requester-garage.entities';

@Controller('requester-garage')
export class RequesterGarageController extends BaseController<RequesterGarageHandler, AddVehicleToGarageRequest, RequesterGarageDto, RequesterGarageResponse, RequesterGarageListResponse> {

  constructor(handler: RequesterGarageHandler) { super(handler); }

  createDtoFromRequest(request: AddVehicleToGarageRequest): RequesterGarageDto {
    throw new Error('Method not implemented.');
  }
  createResponseFromDto(dto: RequesterGarageDto): RequesterGarageResponse {
    throw new Error('Method not implemented.');
  }
  createResponseList(list: RequesterGarageDto[], total: number): RequesterGarageListResponse {
    throw new Error('Method not implemented.');
  }
}
