import { Injectable } from "@nestjs/common";
import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { RequestsService } from "../requests.service";
import { RequestDto } from "../dtos/requests.dto";

@Injectable()
export class RequestsHandler extends BaseHandler<RequestsService, RequestDto> {

  constructor(dbService: RequestsService) {
    super(dbService);
  }
}