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
    return { ...dto.request, statusCode: dto.request.id ? HttpStatus.FOUND : HttpStatus.NOT_FOUND };
  }
  createResponseList(list: BookingDto[], total: number): BookingListResponse {
    return {
      results: list.map((booking) => booking.request),
      totalCount: total,
      count: list.length,
      statusCode: HttpStatus.OK,
     } as BookingListResponse;
  }
}
