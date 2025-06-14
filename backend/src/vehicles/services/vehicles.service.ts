import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { vehicle } from 'src/mvc/models';
import { VehicleDto } from '../dto/vehicle.dto';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VehiclesService extends BaseDbService<vehicle, VehicleDto> {

  constructor(@InjectModel(vehicle) model: typeof vehicle) { super(model); }
  mapToDto(model: vehicle): VehicleDto {
    return new VehicleDto(model);
  }
  mapToModel(dto: VehicleDto): Optional<vehicle, NullishPropertiesOf<vehicle>> {
    return new vehicle(dto.info);
  }
}
