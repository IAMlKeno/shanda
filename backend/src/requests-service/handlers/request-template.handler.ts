import { Injectable } from "@nestjs/common";
import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { RequestTemplateDto } from "../dtos/request-template.dto";
import { RequestTemplateService } from "../request-template.service";

@Injectable()
export class RequestTemplateHandler extends BaseHandler<RequestTemplateService, RequestTemplateDto> {

  constructor(dbService: RequestTemplateService) {
    super(dbService);
  }
}