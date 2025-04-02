import { Module } from '@nestjs/common';
import { BiddingService } from './services/bidding.service';
import { BiddingController } from './controllers/bidding.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { bid } from 'src/mvc/models';
import { BiddingHandler } from './handlers/bidding.handler';

@Module({
  controllers: [BiddingController],
  providers: [BiddingService, BiddingHandler],
  imports: [
    SequelizeModule.forFeature([bid]),
  ],
})
export class BiddingModule {}
