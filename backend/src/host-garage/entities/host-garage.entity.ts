import { ListResponse, Response } from "src/mvc/base/http/entities";
import { garageAttributes as garage } from "src/mvc/models";

export interface HostGarageRequest extends garage {
}

export interface HostGarageResponse extends garage, Omit<Response, 'location'> { }
export interface HostGarageListResponse extends ListResponse<garage> { }
