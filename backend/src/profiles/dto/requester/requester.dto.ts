import { requesterAttributes as Requester } from "src/mvc/models";
import { ProfileDto } from "../profile.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RequesterProfileDto extends ProfileDto {
  info: Requester;
  @ApiProperty()
  contactInfoId?: string;
  @ApiProperty()
  garageId?: string;

  constructor(row: any) {
    super(row);
    this.info = {
      id: row.id,
      garageId: row.garageId,
      userId: row?.userId,
      contactInfoId: row?.contactInfoId,
    }
  }
}