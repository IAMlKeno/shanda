import { garageAttributes as Garage } from "src/mvc/models";

export class GarageDto {
  request: Garage;

  constructor(row: any) {
    this.request = row as Garage;
  }
}
export interface GarageType extends Garage {}
export interface GarageRequest extends Garage {}