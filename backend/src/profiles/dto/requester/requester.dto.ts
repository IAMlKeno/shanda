import { requesterAttributes as Requester } from "src/mvc/models";

export class RequesterDto implements Requester {

  info: Requester;

  constructor(row: any) {
    this.id = row?.id;
    this.userId = row?.userId;
    this.garageId = row?.garageId;
    this.contactInfoId = row?.contactInfoId;
    this.info = {
      userId: row?.userId,
      contactInfoId: row?.contactInfoId,
    }
  }
  id?: string;
  userId: string;
  contactInfoId?: string;
  garageId?: string;
}