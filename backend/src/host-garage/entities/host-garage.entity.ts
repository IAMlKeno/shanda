import { ListResponse } from "src/mvc/base/http/entities";
import { garageAttributes as garage } from "src/mvc/models";

export interface HostGarageRequest extends garage {
}

export interface HostGarageResponse extends garage {
  status: number;
}
export interface HostGarageListResponse extends ListResponse<garage> { }
