import { serviceProviderAttributes as Provider } from "src/mvc/models";
import { ProfileDto } from "../profile.dto";
import { ApiProperty } from "@nestjs/swagger";
import { API_DESCRIPTION_CONTACT_ID } from "src/api-constants";

export class ProviderDto extends ProfileDto {
  info: Provider;
  @ApiProperty()
  companyId?: string;
  @ApiProperty({ description: API_DESCRIPTION_CONTACT_ID })
  contactInfoId?: string;

  constructor(row: any) {
    super(row);
    this.info = {
      companyId: row.companyId,
      userId: row?.userId,
      contactInfoId: row?.contactInfoId,
    }
  }
}
