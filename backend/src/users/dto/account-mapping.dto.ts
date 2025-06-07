import { accountMappingAttributes } from "src/mvc/models/accountMapping";

export class AccountMappingDto {
  info: accountMappingAttributes;

  constructor(row: any) {
    this.info = {
      id: row.id,
      ssoid: row.ssoid,
      userId: row.userId,
    };
  }

}