import { ListResponse, Response } from "src/mvc/base/http/entities";
import { maintenanceLogAttributes as LogAttributes } from "src/mvc/models";

export interface MaintenanceLogRequest extends LogAttributes { }

export interface MaintenanceLogResponse extends LogAttributes, Response { }
export interface MaintenanceLogListResponse extends ListResponse<LogAttributes> { }
