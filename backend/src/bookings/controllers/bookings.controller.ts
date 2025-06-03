import { Controller, HttpStatus } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { BookingHandler } from '../handlers/booking.handler';
import { BookingListResponse, BookingRequest, BookingResponse } from '../entities/booking.entity';
import { BookingDto } from '../dto/booking.dto';

@Controller('bookings')
export class BookingsController extends BaseController<BookingHandler, BookingRequest, BookingDto, BookingResponse, BookingListResponse> {

  constructor(handler: BookingHandler) { super(handler); }

  createDtoFromRequest(request: BookingRequest): BookingDto {
    return new BookingDto(request);
  }
  createResponseFromDto(dto: BookingDto): BookingResponse {
    return new BookingResponse(dto);
  }
  createResponseList(list: BookingDto[], total: number): BookingListResponse {
    return new BookingListResponse(list.map((booking) => booking.request), total);
  }
}
