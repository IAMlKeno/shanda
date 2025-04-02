import { ListResponse } from "src/mvc/base/http/entities";
import { bookingAttributes as Booking } from "src/mvc/models";

export interface BookingRequest extends Booking {
}

export interface BookingResponse extends Booking {
  status: number;
}
export interface BookingListResponse extends ListResponse<Booking> { }
