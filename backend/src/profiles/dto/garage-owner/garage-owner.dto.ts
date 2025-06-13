import { garageOwnerAttributes as GarageOwner } from "src/mvc/models";
import { ProfileDto } from "../profile.dto";
import { ApiProperty } from "@nestjs/swagger";
import { API_DESCRIPTION_CONTACT_ID } from "src/api-constants";

export class GarageOwnerDto extends ProfileDto {
  info: GarageOwnerType;
  @ApiProperty()
  garage: string;
  @ApiProperty({ description: API_DESCRIPTION_CONTACT_ID })
  contactInfo: string;

  constructor(row: any) {
    super(row);
    this.info = {
      user: row?.user,
      contactInfo: row?.contactInfo,
      garage: row.garage,
    }
  }
}
export interface GarageOwnerType extends GarageOwner {}
export interface GarageOwnerRequest extends GarageOwner {}