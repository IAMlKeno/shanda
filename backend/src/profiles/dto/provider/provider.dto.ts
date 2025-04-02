import { serviceProviderAttributes as Provider } from "src/mvc/models";

export class ProviderDto {
  provider: ProviderType;

  constructor(row: any) {
    this.provider.id = row.id;
    this.provider.userId = row.user;
    this.provider.companyId = row.companyId;
    this.provider.contactInfoId = row.contactInfoId;
  }
}
export interface ProviderType extends Provider {}