import { requesterAttributes as Requester } from "src/mvc/models";

export class RequesterDto {
  requester: RequesterType;

  constructor(row: any) {
    this.requester.id = row.id;
    this.requester.userId = row.userId;
    this.requester.garageId = row.garageId;
    this.requester.contactInfoId = row.contactInfoId;
  }
}
export interface RequesterType extends Requester {}