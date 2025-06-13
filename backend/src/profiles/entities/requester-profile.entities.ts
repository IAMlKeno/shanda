import { Response } from "src/mvc/base/http/entities";
import { RequesterProfileDto } from "../dto/requester/requester.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RequesterProfileResponse extends Response<RequesterProfileDto> {
  @ApiProperty({ isArray: false, type: RequesterProfileDto })
  data: RequesterProfileDto;


  static mapToResponse(data: RequesterProfileDto): RequesterProfileResponse {
    return new RequesterProfileResponse(data);
  }
}