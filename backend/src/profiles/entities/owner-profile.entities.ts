import { Response } from "src/mvc/base/http/entities";
import { ApiProperty } from "@nestjs/swagger";
import { GarageOwnerProfileDto } from "../dto/garage-owner/garage-owner.dto";

export class GarageOwnerProfileResponse extends Response<GarageOwnerProfileDto> {
  @ApiProperty({ isArray: false, type: GarageOwnerProfileDto })
  data: GarageOwnerProfileDto;


  static mapToResponse(data: GarageOwnerProfileDto): GarageOwnerProfileResponse {
    return new GarageOwnerProfileResponse(data);
  }
}