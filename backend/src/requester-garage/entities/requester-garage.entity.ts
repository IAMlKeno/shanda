import { ListResponse } from "src/mvc/base/http/entities";
import { vehicleGarageAttributes } from "src/mvc/models";

export interface RequesterGarageRequest extends vehicleGarageAttributes {
  vehicles: any[];
}

export interface RequesterGarageResponse extends vehicleGarageAttributes {
  status: number;
}
export interface RequesterGarageListResponse extends ListResponse<vehicleGarageAttributes> { }
