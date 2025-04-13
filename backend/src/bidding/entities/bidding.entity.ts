import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { ListResponse, Response } from "src/mvc/base/http/entities";
import { bidAttributes as Bid } from "src/mvc/models";
import { BidDto } from "src/profiles/dto/provider/bid.dto";

@ApiSchema({ description: 'Create user data' })
export class BidRequest extends Request {
  @ApiProperty()
  bidAmount: number;
  @ApiProperty()
  completionDate: Date;
  @ApiProperty()
  requestId: string;
}

export class BidResponse extends Response<Bid> {
  constructor(data: BidDto) {
    super(data);
  }
 }
export class BidListResponse extends ListResponse<Bid> { }
