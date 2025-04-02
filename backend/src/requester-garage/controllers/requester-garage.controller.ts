import { Controller } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { RequesterGarageHandler } from '../handlers/requester-garage.handler';
import { RequesterGarageListResponse, RequesterGarageRequest, RequesterGarageResponse } from '../entities/requester-garage.entity';
import { RequesterGarageDto } from '../dto/requester-garage.dto';

@Controller('requester-garage')
export class RequesterGarageController extends BaseController<RequesterGarageHandler, RequesterGarageRequest, RequesterGarageDto, RequesterGarageResponse, RequesterGarageListResponse> {

  constructor(handler: RequesterGarageHandler) { super(handler); }

  createDtoFromRequest(request: RequesterGarageRequest): RequesterGarageDto {
    throw new Error('Method not implemented.');
  }
  createResponseFromDto(dto: RequesterGarageDto): RequesterGarageResponse {
    throw new Error('Method not implemented.');
  }
  createResponseList(list: RequesterGarageDto[], total: number): RequesterGarageListResponse {
    throw new Error('Method not implemented.');
  }
}
