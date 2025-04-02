import { requestAttributes as VehicleRequest } from "src/mvc/models";

export class VehicleRequestDto {
  request: VehicleRequestType;

  constructor(row: any) {
    this.request = row as VehicleRequest;
  }
}
export interface VehicleRequestType extends VehicleRequest {}
export interface VehicleRequestObject extends VehicleRequest {}