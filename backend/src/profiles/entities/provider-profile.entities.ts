import { Response } from "src/mvc/base/http/entities";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { ProviderProfileDto } from "../dto/provider/provider.dto";

@ApiSchema()
export class ProviderProfileResponse extends Response<ProviderProfileDto> {
  @ApiProperty({ isArray: false, type: ProviderProfileDto })
  data: ProviderProfileDto;


  static mapToResponse(data: ProviderProfileDto): ProviderProfileResponse {
    return new ProviderProfileResponse(data);
  }
}