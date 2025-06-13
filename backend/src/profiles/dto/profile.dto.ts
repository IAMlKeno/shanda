import { ApiProperty } from "@nestjs/swagger";
import { API_DESCRIPTION_OWNER_ID } from "src/constants";

export class ProfileDto {
  @ApiProperty()
  id?: string;
  @ApiProperty({ description: API_DESCRIPTION_OWNER_ID })
  userId: string;

  constructor(row: any) {
    this.userId = row?.userId;
    this.id = row?.contactInfoId;
  }
}