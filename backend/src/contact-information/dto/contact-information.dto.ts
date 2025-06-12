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
    this.info = row as Model;
  }
}

export class CreateContactInformationDto {
  @ApiProperty({ required: true })
  phone: string;
  @ApiProperty({ required: true })
  email: string;
}

export interface ContactInfo extends Model {}
