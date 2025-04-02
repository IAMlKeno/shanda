import { garageAttributes } from "src/mvc/models";

export class HostGarageDto {
  garage: HostGarageType;

  constructor(row: any) {
    this.garage = row as garageAttributes
  }
}

export interface HostGarageType extends garageAttributes {}
