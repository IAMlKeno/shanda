import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { IBaseHandler } from "src/mvc/base/base.controller";
import { BookingDto } from "../dto/booking.dto";
import { BookingsService } from "../services/bookings.service";

export class BookingHandler extends BaseHandler<BookingsService, BookingDto> implements IBaseHandler<BookingDto> {

  constructor(dbService: BookingsService) {
    super(dbService);
  }

}