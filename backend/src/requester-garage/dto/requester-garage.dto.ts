import { vehicleGarage as Garage } from "src/mvc/models";

export class RequesterGarageDto {
  garage: RequesterGarageType;
  vehicles: any[];

  constructor(row: any) {
    this.garage = row as Garage;
  }
}
export interface RequesterGarageType extends Garage {}
