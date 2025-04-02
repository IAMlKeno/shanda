import { Module } from '@nestjs/common';
import { BookingsService } from './services/bookings.service';
import { BookingsController } from './controllers/bookings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { booking } from 'src/mvc/models';
import { BookingHandler } from './handlers/booking.handler';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, BookingHandler],
  imports: [
    SequelizeModule.forFeature([booking]),
  ],
})
export class BookingsModule {}
