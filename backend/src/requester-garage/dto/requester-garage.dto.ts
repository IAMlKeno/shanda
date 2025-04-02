import { garageAttributes } from "src/mvc/models";

export class RequesterGarageDto {
  garage: RequesterGarageType;
  vehicles: any[];

  constructor(row: any) {
    this.garage = row as garageAttributes;
  }
}
export interface RequesterGarageType extends garageAttributes {}
