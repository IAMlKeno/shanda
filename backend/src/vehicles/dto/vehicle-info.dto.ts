import { ApiProperty } from "@nestjs/swagger";
import { vehicleAttributes as Vehicle } from "src/mvc/models";
import { extractAdditionalProperties } from "src/utils/misc.utils";

export class VehicleInfoDto {
  @ApiProperty()
  vin: string;
  @ApiProperty()
  make: string
  @ApiProperty()
  model: string
  @ApiProperty()
  color: string
  @ApiProperty()
  trim: string
  @ApiProperty()
  year: number
  @ApiProperty()
  additionalInformation: Object
  @ApiProperty()
  vehicleLog: string;

  constructor(row: any) {
    this.vin = row.vin;
    this.make = row.make;
    this.model = row.model;
    this.trim = row.trim;
    this.color = row.color;
    this.year = row.year;
    this.vehicleLog = row.vehicleLog;
    this.additionalInformation = extractAdditionalProperties(this, row);
  }
}
export interface VehicleRequest extends Vehicle {}