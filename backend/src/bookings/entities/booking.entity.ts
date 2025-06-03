import { ListResponse, Response } from "src/mvc/base/http/entities";
import { bookingAttributes as Booking } from "src/mvc/models";
import { BookingDto } from "../dto/booking.dto";

export class BookingRequest extends Request {
}

export class BookingResponse extends Response<Booking> {
  constructor(data: BookingDto) {
    super(data);
  }
}
export class BookingListResponse extends ListResponse<Booking> { }
