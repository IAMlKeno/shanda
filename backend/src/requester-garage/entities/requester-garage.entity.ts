import { ListResponse, Response } from "src/mvc/base/http/entities";
import { vehicleGarageAttributes } from "src/mvc/models";
import { RequesterGarageDto } from "../dto/requester-garage.dto";

export interface RequesterGarageRequest extends vehicleGarageAttributes {
  vehicles: any[];
}

export class RequesterGarageResponse extends Response<vehicleGarageAttributes> {
  constructor(data: RequesterGarageDto) {
    super(data);
  }
}
export class RequesterGarageListResponse extends ListResponse<vehicleGarageAttributes> { }
