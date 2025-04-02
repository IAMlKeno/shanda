import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { garage } from 'src/mvc/models';
import { HostGarageDto } from '../dto/host-garage.dto';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class HostGarageService extends BaseDbService<garage, HostGarageDto> {

  constructor(@InjectModel(garage) model: typeof garage) { super(model); }

  mapToDto(model: garage): HostGarageDto {
    return new HostGarageDto(model);
  }
  mapToModel(dto: HostGarageDto): Optional<garage, NullishPropertiesOf<garage>> {
    return new garage(dto);
  }
}
