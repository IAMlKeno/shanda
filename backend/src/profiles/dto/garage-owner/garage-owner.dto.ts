import { garageOwnerAttributes as GarageOwner } from "src/mvc/models";

export class GarageOwnerDto implements GarageOwnerType {
  owner: GarageOwnerType;

  constructor(row: any) {
    this.id = row?.id;
    this.user = row?.user;
    this.garage = row?.garage;
    this.contactInfo = row?.contactInfo;
    this.owner = {
      user: row?.user,
      contactInfo: row?.contactInfo
    }
  }
  id?: string;
  user: string;
  garage?: string;
  contactInfo?: string;
}
export interface GarageOwnerType extends GarageOwner {}
export interface GarageOwnerRequest extends GarageOwner {}