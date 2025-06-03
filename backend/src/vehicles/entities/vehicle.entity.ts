import { ListResponse, Response } from "src/mvc/base/http/entities";
import { vehicleAttributes as Vehicle } from "src/mvc/models";
import { VehicleDto } from "../dto/vehicle.dto";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ description: 'Vehicle request' })
export class VehicleRequest extends Request {
  @ApiProperty()
  vin: string;
  @ApiProperty()
  vehicleInformation: object;
  @ApiProperty()
  garageId: string;
}

export class VehicleResponse extends Response<Vehicle> {
  constructor(data: VehicleDto) {
    super(data);
  }
}

export class VehicleListResponse extends ListResponse<Vehicle> { }
