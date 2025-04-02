import { bidAttributes as Bid } from "src/mvc/models";

export class BidDto {
  request: BidType;

  constructor(row: any) {
    this.request = row as Bid;
  }
}
export interface BidType extends Bid {}
export interface BidRequest extends Bid {}