import { ListResponse, Response } from "src/mvc/base/http/entities";
import { bookingAttributes as Booking } from "src/mvc/models";

export interface BookingRequest extends Booking { }

export interface BookingResponse extends Booking, Response { }
export interface BookingListResponse extends ListResponse<Booking> { }
