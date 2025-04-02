import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { IBaseHandler } from "src/mvc/base/base.controller";
import { BiddingService } from "../services/bidding.service";
import { BidDto } from "src/profiles/dto/provider/bid.dto";

export class BiddingHandler extends BaseHandler<BiddingService, BidDto> implements IBaseHandler<BidDto> {

  constructor(dbService: BiddingService) {
    super(dbService);
  }

}