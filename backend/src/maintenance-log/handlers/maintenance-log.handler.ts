import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { IBaseHandler } from "src/mvc/base/base.controller";
import { MaintenanceLogService } from "../services/maintenance-log.service";
import { VehicleLogDto } from "../dto/maintenance-log.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MaintenanceLogHandler extends BaseHandler<MaintenanceLogService, VehicleLogDto> implements IBaseHandler<VehicleLogDto> {

  constructor(dbService: MaintenanceLogService) {
    super(dbService);
  }

}