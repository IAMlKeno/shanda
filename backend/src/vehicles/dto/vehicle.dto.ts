import { ApiProperty } from "@nestjs/swagger";
import { vehicleAttributes as Vehicle } from "src/mvc/models";

export class VehicleDto {
  info: Vehicle;

  @ApiProperty()
  id?: string;
  @ApiProperty()
  vin: string;
  @ApiProperty()
  vehicleInformation: object;
  @ApiProperty()
  garageId?: string;
  @ApiProperty()
  vehicleLog: string;

  constructor(row: any) {
    this.info = {
      id: row.id,
      vin: row.vin,
      vehicleInformation: row.vehicleInformation,
      garageId: row.garageId,
      vehicleLog: row.vehicleLog,
    };
  }
}
// export interface VehicleRequest extends Vehicle {}