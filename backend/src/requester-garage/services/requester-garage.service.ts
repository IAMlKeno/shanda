import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { vehicleGarage as Garage } from 'src/mvc/models';
import { RequesterGarageDto } from '../dto/requester-garage.dto';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';
import { VehicleHandler } from 'src/vehicles/handlers/vehicle.handler';

@Injectable()
export class RequesterGarageService extends BaseDbService<Garage, RequesterGarageDto> {

  constructor(@InjectModel(Garage) model: typeof Garage, private readonly vehicleHandler: VehicleHandler) { super(model); }

  async getGarageAndVehiclesByGarageId(id: string) {
    const garage = await this.model.findByPk(id);
    const vehicles = await this.getVehiclesByGarageId(garage.id);

    return { garage, vehicles };
  }

  async getVehiclesByGarageId(id: string) {
    return this.vehicleHandler.getAll(1, 20, [{ garageId: id }]);
  }

  mapToDto(model: Garage): RequesterGarageDto {
    return new RequesterGarageDto(model);
  }

  mapToModel(dto: RequesterGarageDto): Optional<Garage, NullishPropertiesOf<Garage>> {
    return new Garage(dto);
  }
}
