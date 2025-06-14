import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { vehicle } from 'src/mvc/models';
import { VehicleDto } from '../dto/vehicle.dto';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';
/// @ts-ignore
import { DecodeVinValues, DecodeVinValuesResults, isValidVin, NhtsaResponse } from '@shaggytools/nhtsa-api-wrapper';

@Injectable()
export class VehiclesService extends BaseDbService<vehicle, VehicleDto> {

  constructor(@InjectModel(vehicle) model: typeof vehicle) { super(model); }

  async externalVinLookup(vin: string): Promise<any> {
    const value: NhtsaResponse<DecodeVinValuesResults> = await DecodeVinValues(vin);
    const row = {
      year: value.Results[0].ModelYear,
      make: value.Results[0].Make,
      model: value.Results[0].Model,
      trim: value.Results[0].Trim,
      body: value.Results[0].BodyClass,
      vin: value.Results[0].VIN,
    }
    return row;
  }
  isVinValid(vin: string): boolean {
    return isValidVin(vin)
  }
  mapToDto(model: vehicle): VehicleDto {
    return new VehicleDto(model);
  }
  mapToModel(dto: VehicleDto): Optional<vehicle, NullishPropertiesOf<vehicle>> {
    return new vehicle(dto.info);
  }
}
