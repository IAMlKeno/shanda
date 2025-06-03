import { requesterAttributes as Requester } from "src/mvc/models";

export class RequesterDto {
  requester: RequesterType;

  constructor(row: any) {
    this.requester = {
      id: row.id,
      userId: row.userId,
      garageId: row.garageId,
      contactInfoId: 'row.contactInfoId'
    }
  }
}
export interface RequesterType extends Requester {}