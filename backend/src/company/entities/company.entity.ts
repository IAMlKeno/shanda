import { ListResponse, Response } from "src/mvc/base/http/entities";
import { companyInformationAttributes as CompanyInfo } from "src/mvc/models";
import { CompanyDto } from "../dto/company.dto";

export interface CompanyRequest extends CompanyInfo {
  contactInfo: {
    phone: string,
    email: string,
  };
 }

export class CompanyResponse extends Response<CompanyInfo> {
  constructor(data: CompanyDto) {
    super(data);
  }
}
export class CompanyListResponse extends ListResponse<CompanyInfo> { }
