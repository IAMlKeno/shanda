import { bookingAttributes as Booking } from "src/mvc/models";

export class BookingDto {
  request: BookingType;

  constructor(row: any) {
    this.request = row as Booking
  }
}

export interface BookingType extends Booking {}
