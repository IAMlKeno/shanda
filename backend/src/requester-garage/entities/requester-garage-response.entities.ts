import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { RequesterGarageDto } from "../dto/requester-garage.dto";
import { ListResponse, Response } from "src/mvc/base/http/entities";
import { NOT_IMPLEMENTED } from "src/constants";

@ApiSchema()
export class RequesterGarageResponse extends Response<RequesterGarageDto> {
  @ApiProperty({ type: RequesterGarageDto })
  data: any;

  constructor(data: RequesterGarageDto) {
    super(data);
  }
}

export class RequesterGarageListResponse extends ListResponse<RequesterGarageDto> { 
  constructor(data: any) {
    super(data, 0);
    throw new Error(NOT_IMPLEMENTED);
  }
}
