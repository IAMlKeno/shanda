import { IBaseHandler } from "src/mvc/base/base.controller";
import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { RequesterGarageDto } from "../dto/requester-garage.dto";
import { RequesterGarageService } from "../services/requester-garage.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RequesterGarageHandler extends BaseHandler<RequesterGarageService, RequesterGarageDto> implements IBaseHandler<RequesterGarageDto> {

  constructor(dbService: RequesterGarageService) {
    super(dbService);
  }

  async getGarageByUserId(userId: string) {
    return this.dbService.getAll(1, 1, { userId: userId });
  }

  async getGarageById(id: string) {
    const garage = await this.dbService.get(id);
    const vehicles = await this.dbService.getVehiclesByGarageId(garage.garage.id);

    return { garage, vehicles };
  }

}