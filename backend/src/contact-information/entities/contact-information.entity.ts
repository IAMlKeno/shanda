import { ListResponse, Response } from "src/mvc/base/http/entities";
import { contactInformationAttributes } from "src/mvc/models";

export class ContactInformation {}

export interface ContactInformationRequest extends contactInformationAttributes {}
export interface ContactInformationResponse extends contactInformationAttributes, Response { }
export interface ContactInformationListResponse extends ListResponse<contactInformationAttributes> { }
