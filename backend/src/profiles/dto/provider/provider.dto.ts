import { serviceProviderAttributes as Provider } from "src/mvc/models";
import { ProfileDto } from "../profile.dto";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { API_DESCRIPTION_CONTACT_ID } from "src/api-constants";

@ApiSchema({ name: 'ProviderProfileDto' })
export class ProviderProfileDto extends ProfileDto {
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
