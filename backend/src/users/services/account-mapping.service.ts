import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Optional, QueryTypes } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { BaseDbService } from "src/mvc/base/data/base.service";
import { accountMapping } from "src/mvc/models/accountMapping";
import { AccountMappingDto } from "../dto/account-mapping.dto";
import { garageOwner, requester, serviceProvider, user } from "src/mvc/models";
import { Sequelize } from "sequelize-typescript";
import { UserAndProfileIdsDto } from "../dto/user.dto";

@Injectable()
export class AccountMappingService extends BaseDbService<accountMapping, AccountMappingDto> {

  constructor(
    @InjectModel(accountMapping)
    @Inject('ACCOUNTMAPPING_INFO_REPOSITORY')
    model: typeof accountMapping,
    private sequelize: Sequelize,
  ) { super(model); }

  async getUserBySsoid(ssoid: string): Promise<UserAndProfileIdsDto | undefined> {
    const results = await this.sequelize.query(`select
        u.id, u.username, r.id requesterId, sp.id providerId, go2.id ownerId, u.status,
        u."contactInfoId", u.lastprofileloaded
      from public."accountMappingId" ami
      join public."user" u on u.id = ami."userId"
      left join public.requester r on r."userId" = u.id
      left join public."serviceProvider" sp  on sp."userId" = u.id
      left join public."garageOwner" go2  on go2."user" = u.id
      where ami.ssoid = :ssoid
      limit 1`,
      {
        replacements: {
          ssoid: ssoid
        },
        type: QueryTypes.SELECT,
      });
    const result = results.length > 0 ? new UserAndProfileIdsDto(results[0]) : undefined;

    return result;
  }

  mapToDto(model: accountMapping): AccountMappingDto {
    return new AccountMappingDto(model);
  }
  mapToModel(dto: AccountMappingDto): Optional<accountMapping, NullishPropertiesOf<accountMapping>> {
    return new accountMapping(dto.info);
  }
}