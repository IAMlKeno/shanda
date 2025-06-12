import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { ListResponse, Response } from "src/mvc/base/http/entities";
import { RequestTemplateDto } from "../dtos/request-template.dto";

@ApiSchema({ description: 'Create user data' })
export class RequestTemplateResponse extends Response<RequestTemplateDto> {
  @ApiProperty({ isArray: false, type: RequestTemplateDto })
  data: RequestTemplateDto;


  static mapToResponse(data: RequestTemplateDto): RequestTemplateResponse {
    return new RequestTemplateResponse(data);
  }
}

@ApiSchema({ description: 'Get request templates' })
export class RequestTemplateListReponse extends ListResponse<RequestTemplateDto> {
  @ApiProperty({ isArray: true, type: RequestTemplateDto, })
  data: Array<RequestTemplateDto>;

  static mapToListResponse(list: any[], total?: number): RequestTemplateListReponse {
    return new RequestTemplateListReponse(list.map((item: RequestTemplateDto) => item.info), total);
  }
}