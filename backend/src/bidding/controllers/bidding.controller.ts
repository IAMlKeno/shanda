import { Controller, HttpStatus } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { BiddingHandler } from '../handlers/bidding.handler';
import { BidListResponse, BidRequest, BidResponse } from '../entities/bidding.entity';
import { BidDto } from 'src/profiles/dto/provider/bid.dto';

@Controller('bidding')
export class BiddingController extends BaseController<BiddingHandler, BidRequest, BidDto, BidResponse, BidListResponse> {

  constructor(handler: BiddingHandler) { super(handler); }

  createDtoFromRequest(request: BidRequest): BidDto {
    return new BidDto(request);
  }
  createResponseFromDto(dto: BidDto): BidResponse {
    return new BidResponse(dto);
  }
  createResponseList(list: BidDto[], total: number): BidListResponse {
    return new BidListResponse(list.map((bid) => bid.request), total);
  }
}
