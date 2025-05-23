import { ListResponse, Response } from "src/mvc/base/http/entities";
import { vehicleAttributes as Vehicle } from "src/mvc/models";

export interface VehicleRequest extends Vehicle { }

export interface VehicleResponse extends Vehicle, Response { }
export interface VehicleListResponse extends ListResponse<Vehicle> { }
