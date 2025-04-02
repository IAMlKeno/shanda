import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { companyInformation } from 'src/mvc/models';
import { CompanyDto } from '../dto/company.dto';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CompanyService extends BaseDbService<companyInformation, CompanyDto> {

  constructor(@InjectModel(companyInformation) model: typeof companyInformation) { super(model); }

  mapToDto(model: companyInformation): CompanyDto {
    return new CompanyDto(model);
  }
  mapToModel(dto: CompanyDto): Optional<companyInformation, NullishPropertiesOf<companyInformation>> {
    return new companyInformation(dto.company);
  }
}
