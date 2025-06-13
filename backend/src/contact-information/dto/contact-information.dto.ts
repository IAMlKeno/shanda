import { ApiProperty } from "@nestjs/swagger";
import { contactInformationAttributes as Model } from "src/mvc/models";

export class ContactInformationDto {
  info: ContactInfo;
  @ApiProperty()
  id?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  email?: string;

  constructor(row: any) {
    this.info = {
      id: row.id,
      phone: row.phone,
      email: row.email,
    }
  }
}

export class CreateContactInformationDto {
  @ApiProperty({ required: true })
  phone: string;
  @ApiProperty({ required: true })
  email: string;
}

export interface ContactInfo extends Model {}
