import { ListResponse } from "src/mvc/base/http/entities";
import { companyInformationAttributes } from "src/mvc/models";

export interface CompanyRequest extends companyInformationAttributes {
  contactInfo: {
    phone: string,
    email: string,
  };
 }

export interface CompanyResponse extends companyInformationAttributes {
  status: number;
}
export interface CompanyListResponse extends ListResponse<companyInformationAttributes> { }
