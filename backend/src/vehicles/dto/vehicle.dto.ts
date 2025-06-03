import { vehicleAttributes as Vehicle } from "src/mvc/models";

export class VehicleDto {
  vehicle: VehicleType;

  constructor(row: any) {
    this.vehicle = row as Vehicle;
  }
}
export interface VehicleType extends Vehicle {}
export interface VehicleRequest extends Vehicle {}