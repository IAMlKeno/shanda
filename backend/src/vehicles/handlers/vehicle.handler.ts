import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { VehiclesService } from "../services/vehicles.service";
import { VehicleDto } from "../dto/vehicle.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VehicleHandler extends BaseHandler<VehiclesService, VehicleDto> {
  constructor(dbService: VehiclesService) { super(dbService); }
}