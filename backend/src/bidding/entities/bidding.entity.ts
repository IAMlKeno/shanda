import { ListResponse } from "src/mvc/base/http/entities";
import { bidAttributes as Bid } from "src/mvc/models";

export interface BidRequest extends Bid {
}

export interface BidResponse extends Bid {
  status: number;
}
export interface BidListResponse extends ListResponse<Bid> { }
