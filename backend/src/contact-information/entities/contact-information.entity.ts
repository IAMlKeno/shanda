import { ListResponse, Response } from "src/mvc/base/http/entities";
import { contactInformationAttributes as Model } from "src/mvc/models";
import { ContactInformationDto } from "../dto/contact-information.dto";

export class ContactInformation {}

export interface ContactInformationRequest extends Model {}
export class ContactInformationResponse extends Response<Model> {
  constructor(data: ContactInformationDto) {
    super(data);
  }
}
export class ContactInformationListResponse extends ListResponse<Model> { }
