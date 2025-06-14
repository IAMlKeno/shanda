import { ApiProperty } from "@nestjs/swagger";
import { API_DESCRIPTION_VEHICLE_GROUP } from "src/api-constants";
import { vehicleGarageAttributes as Garage } from "src/mvc/models";
import { VehicleDto } from "src/vehicles/dto/vehicle.dto";

export class RequesterGarageDto {
  info: Garage;
  @ApiProperty()
  id?: string;
  @ApiProperty({ description: API_DESCRIPTION_VEHICLE_GROUP })
  vehicles?: VehicleDto[];

  constructor(row: any) {
    this.info = {
      id: row.id,
    };
  }
}
