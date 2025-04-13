import { ListResponse, Response } from "src/mvc/base/http/entities";
import { garageAttributes as garage } from "src/mvc/models";
import { HostGarageDto } from "../dto/host-garage.dto";

export interface HostGarageRequest extends garage {
}

export class HostGarageResponse extends Response<garage> {
  constructor(data: HostGarageDto) {
    super(data);
  }
}
export class HostGarageListResponse extends ListResponse<garage> { }
