import { maintenanceLogAttributes as Log } from "src/mvc/models";

export class VehicleLogDto {
  info: VehicleLogType;

  constructor(row: any) {
    this.info = {
      id: row.id,
      details: row.details,
    }
  }
}
export interface VehicleLogType extends Log {}
export interface VehicleLogRequest extends Log {}