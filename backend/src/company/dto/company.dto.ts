import { companyInformationAttributes } from "src/mvc/models";

export class CompanyDto {
  company: CompanyType;

  constructor(row: any) {
    this.company = row as companyInformationAttributes
  }
}

export interface CompanyType extends companyInformationAttributes {}
