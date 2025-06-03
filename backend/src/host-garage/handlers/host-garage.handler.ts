import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { IBaseHandler } from "src/mvc/base/base.controller";
import { HostGarageService } from "../services/host-garage.service";
import { HostGarageDto } from "../dto/host-garage.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HostGarageHandler extends BaseHandler<HostGarageService, HostGarageDto> implements IBaseHandler<HostGarageDto> {

  constructor(dbService: HostGarageService) {
    super(dbService);
  }

}