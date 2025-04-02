import { receiptAttributes as Receipt } from "src/mvc/models";

export class ReceiptDto {
  request: ReceiptType;

  constructor(row: any) {
    this.request = row as Receipt;
  }
}
export interface ReceiptType extends Receipt {}
export interface ReceiptRequest extends Receipt {}