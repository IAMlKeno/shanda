import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { vehicleGarage as Garage } from 'src/mvc/models';
import { RequesterGarageDto } from '../dto/requester-garage.dto';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RequesterGarageService extends BaseDbService<Garage, RequesterGarageDto> {

  constructor(@InjectModel(Garage) model: typeof Garage) { super(model); }

  mapToDto(model: Garage): RequesterGarageDto {
    return new RequesterGarageDto(model);
  }

  mapToModel(dto: RequesterGarageDto): Optional<Garage, NullishPropertiesOf<Garage>> {
    return new Garage(dto);
  }
}
