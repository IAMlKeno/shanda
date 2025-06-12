import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { RequestDto } from "../dtos/requests.dto";
import { ListResponse, Response } from "src/mvc/base/http/entities";

@ApiSchema({ name: 'RequestResponse', description: 'Create user data' })
export class RequestResponse extends Response<RequestDto> {
  @ApiProperty({ isArray: false, type: RequestDto })
  data: RequestDto;


  static mapToResponse(data: RequestDto): RequestResponse {
    return new RequestResponse(data);
  }
}

@ApiSchema({ name: 'RequestListReponse', description: 'Get list of requests' })
export class RequestListReponse extends ListResponse<RequestDto> {
  @ApiProperty({ isArray: true, type: RequestDto, })
  data: Array<RequestDto>;

  static mapToListResponse(list: any[], total?: number): RequestListReponse {
    return new RequestListReponse(list.map((item: RequestDto) => item.info), total);
  }
}