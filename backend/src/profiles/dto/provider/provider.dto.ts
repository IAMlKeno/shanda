import { serviceProviderAttributes as Provider } from "src/mvc/models";

export class ProviderDto implements Provider {

  info: Provider;

  constructor(row: any) {
    this.id = row?.id;
    this.userId = row?.userId;
    this.companyId = row?.companyId;
    this.contactInfoId = row?.contactInfoId;
    this.info = {
      userId: row?.userId,
      contactInfoId: row?.contactInfoId,
    }
  }
  id?: string;
  userId: string;
  companyId?: string;
  contactInfoId?: string;
}
