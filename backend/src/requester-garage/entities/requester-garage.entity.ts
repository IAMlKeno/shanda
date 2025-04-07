import { ListResponse, Response } from "src/mvc/base/http/entities";
import { vehicleGarageAttributes } from "src/mvc/models";

export interface RequesterGarageRequest extends vehicleGarageAttributes {
  vehicles: any[];
}

export interface RequesterGarageResponse extends vehicleGarageAttributes, Response { }
export interface RequesterGarageListResponse extends ListResponse<vehicleGarageAttributes> { }
