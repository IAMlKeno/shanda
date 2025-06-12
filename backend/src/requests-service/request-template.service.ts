import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';
import { requestTemplate } from 'src/mvc/models/requestTemplate';
import { RequestTemplateDto } from './dtos/request-template.dto';

@Injectable()
export class RequestTemplateService extends BaseDbService<requestTemplate, RequestTemplateDto> {

  constructor(@InjectModel(requestTemplate) model: typeof requestTemplate) {
    super(model);
  }

  mapToDto(model: requestTemplate): RequestTemplateDto {
   return new RequestTemplateDto(model);
  }
  mapToModel(dto: RequestTemplateDto): Optional<requestTemplate, NullishPropertiesOf<requestTemplate>> {
    return new requestTemplate(dto.info);
  }
}