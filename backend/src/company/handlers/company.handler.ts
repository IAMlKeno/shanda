import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { IBaseHandler } from "src/mvc/base/base.controller";
import { CompanyDto } from "../dto/company.dto";
import { CompanyService } from "../services/company.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CompanyHandler extends BaseHandler<CompanyService, CompanyDto> implements IBaseHandler<CompanyDto> {

  constructor(dbService: CompanyService) {
    super(dbService);
  }

}