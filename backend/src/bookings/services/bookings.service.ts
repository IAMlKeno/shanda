import { Injectable } from '@nestjs/common';
import { booking } from 'src/mvc/models';
import { BookingDto } from '../dto/booking.dto';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookingsService extends BaseDbService<booking, BookingDto> {

  constructor(@InjectModel(booking) model: typeof booking) { super(model); }
  mapToDto(model: booking): BookingDto {
    return new BookingDto(model);
  }
  mapToModel(dto: BookingDto): Optional<booking, NullishPropertiesOf<booking>> {
    return new booking(dto.request);
  }
}
