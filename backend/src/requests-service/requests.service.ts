import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { request } from 'src/mvc/models';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';
import { RequestDto } from './dtos/requests.dto';

@Injectable()
export class RequestsService extends BaseDbService<request, RequestDto> {

  constructor(@InjectModel(request) model: typeof request) {
    super(model);
  }

  mapToDto(model: request): RequestDto {
   return new RequestDto(model);
  }
  mapToModel(dto: RequestDto): Optional<request, NullishPropertiesOf<request>> {
    return new request(dto.info);
  }
}