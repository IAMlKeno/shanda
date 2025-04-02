import { maintenanceLogAttributes as Log } from "src/mvc/models";

export class VehicleLogDto {
  request: VehicleLogType;

  constructor(row: any) {
    this.request = row as Log;
  }
}
export interface VehicleLogType extends Log {}
export interface VehicleLogRequest extends Log {}