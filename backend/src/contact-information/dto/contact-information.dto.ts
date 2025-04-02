import { contactInformationAttributes as Model } from "src/mvc/models";

export class ContactInformationDto {
  info: ContactInfo;

  constructor(row: any) {
    this.info = row as Model;
  }
}

export interface ContactInfo extends Model {}
