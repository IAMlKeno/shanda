import { Injectable } from "@nestjs/common";
import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { AccountMappingService } from "../services/account-mapping.service";
import { AccountMappingDto } from "../dto/account-mapping.dto";

@Injectable()
export class AccountMappingHandler extends BaseHandler<AccountMappingService, AccountMappingDto> {

  constructor(dbService: AccountMappingService) {
    super(dbService);
  }
}