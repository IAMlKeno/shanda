import { garageOwnerAttributes as GarageOwner } from "src/mvc/models";

export class GarageOwnerDto {
  owner: GarageOwnerType;

  constructor(row: any) {
    this.owner.id = row.id;
    this.owner.user = row.user;
    this.owner.garage = row.garage;
    this.owner.contactInfo = row.contactInfo;
  }
}
export interface GarageOwnerType extends GarageOwner {}
export interface GarageOwnerRequest extends GarageOwner {}