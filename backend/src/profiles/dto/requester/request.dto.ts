import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Request } from "src/mvc/base/http/entities";
import { requestAttributes as VehicleRequest } from "src/mvc/models";

export class VehicleRequestDto {
  request: VehicleRequestType;

  constructor(row: any) {
    this.request = row as VehicleRequest;
  }
}
export interface VehicleRequestType extends VehicleRequest {}

@ApiSchema({ description: 'Vehicle request data' })
export class VehicleRequestObject extends Request {
  @ApiProperty()
  summary: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  vehicleId: string;
  @ApiProperty()
  requesterId: string;
}