import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { BaseDbService } from "src/mvc/base/data/base.service";
import { accountMapping } from "src/mvc/models/accountMapping";
import { AccountMappingDto } from "../dto/account-mapping.dto";

@Injectable()
export class AccountMappingService extends BaseDbService<accountMapping, AccountMappingDto> {

  constructor(
    @InjectModel(accountMapping)
    @Inject('ACCOUNTMAPPING_INFO_REPOSITORY')
    model: typeof accountMapping,
  ) { super(model); }

  mapToDto(model: accountMapping): AccountMappingDto {
    return new AccountMappingDto(model);
  }
  mapToModel(dto: AccountMappingDto): Optional<accountMapping, NullishPropertiesOf<accountMapping>> {
    return new accountMapping(dto.info);
  }
}