import { IBaseHandler } from "src/mvc/base/base.controller";
import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { RequesterGarageDto } from "../dto/requester-garage.dto";
import { RequesterGarageService } from "../services/requester-garage.service";
import { Injectable } from "@nestjs/common";
import { VehicleDto } from "src/vehicles/dto/vehicle.dto";

@Injectable()
export class RequesterGarageHandler extends BaseHandler<RequesterGarageService, RequesterGarageDto> implements IBaseHandler<RequesterGarageDto> {

  constructor(dbService: RequesterGarageService) {
    super(dbService);
  }

  async addToGarage(garageId: string, vehicle: VehicleDto): Promise<boolean> {
    return await this.dbService.addToGarage(garageId, vehicle.vin)
  }

  async getGarageByUserId(userId: string): Promise<string | undefined> {
    return await this.dbService.getGarageByUserId(userId);
  }

  async getGarageById(id: string): Promise<RequesterGarageDto> {
    const garage: RequesterGarageDto = await this.dbService.get(id);
    garage.vehicles = await this.dbService.getVehiclesByGarageId(garage.info.id);

    return garage;
  }

}