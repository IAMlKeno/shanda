import { ListResponse, Request, Response } from "src/mvc/base/http/entities";
import { maintenanceLogAttributes as LogAttributes } from "src/mvc/models";
import { VehicleLogDto } from "../dto/maintenance-log.dto";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

export interface MaintenanceLogRequest extends LogAttributes { }

export class MaintenanceLogResponse extends Response<LogAttributes> {
  constructor(data: VehicleLogDto) {
    super(data);
  }
}
export class MaintenanceLogListResponse extends ListResponse<LogAttributes> { }

@ApiSchema({ description: 'Request object to get vehicles log' })
export class GetVehicleLogRequest extends Request {
  @ApiProperty()
  vin: string;
}