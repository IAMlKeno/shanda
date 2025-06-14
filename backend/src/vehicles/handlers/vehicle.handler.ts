import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { VehiclesService } from "../services/vehicles.service";
import { VehicleDto } from "../dto/vehicle.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VehicleHandler extends BaseHandler<VehiclesService, VehicleDto> {
  constructor(dbService: VehiclesService) { super(dbService); }

  async externalVinLookup(vin: string): Promise<any> {
    return await this.dbService.externalVinLookup(vin);
  }

  isVinValid(vin: string): boolean {
    return this.dbService.isVinValid(vin);
  }
}