import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { bid } from 'src/mvc/models';
import { BidDto } from 'src/profiles/dto/provider/bid.dto';

@Injectable()
export class BiddingService extends BaseDbService<bid, BidDto> {

  constructor(@InjectModel(bid) model: typeof bid) { super(model); }

  mapToDto(model: bid): BidDto {
    return new BidDto(model);
  }
  mapToModel(dto: BidDto): Optional<bid, NullishPropertiesOf<bid>> {
    return new bid(dto.request);
  }
}
