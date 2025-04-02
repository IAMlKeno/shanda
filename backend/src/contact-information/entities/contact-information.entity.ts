import { ListResponse } from "src/mvc/base/http/entities";
import { contactInformationAttributes } from "src/mvc/models";

export class ContactInformation {}

export interface ContactInformationRequest extends contactInformationAttributes {}
export interface ContactInformationResponse extends contactInformationAttributes {
  status: number;
}
export interface ContactInformationListResponse extends ListResponse<contactInformationAttributes> { }
