import { vehicleAttributes as Vehicle } from "src/mvc/models";

export class VehicleDto {
  request: VehicleType;

  constructor(row: any) {
    this.request = row as Vehicle;
  }
}
export interface VehicleType extends Vehicle {}
export interface VehicleRequest extends Vehicle {}