import { requestAttributes } from "src/mvc/models";
import { ApiProperty } from "@nestjs/swagger";
import { convertStrToEnum, REQUEST_CATEGORY, REQUEST_STATUS, REQUEST_TAGS } from "src/mvc/enums/enum";

export class RequestDto {
  info: requestAttributes;
  @ApiProperty()
  id?: string;
  @ApiProperty()
  summary?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  vehicleId?: string;
  @ApiProperty()
  requesterId?: string;
  @ApiProperty({ enum: Object.keys(REQUEST_STATUS), description: 'Request status', enumName: 'REQUEST_STATUS' })
  status?: REQUEST_STATUS;
  @ApiProperty({ default: 'CURRENT_TIMESTAMP' })
  created?: Date;
  @ApiProperty()
  deleted?: Date;
  @ApiProperty()
  tags?: REQUEST_TAGS[];
  @ApiProperty()
  category?: REQUEST_CATEGORY;

  constructor(row: any) {
    this.info = {
      id: row.id,
      summary: row.summary,
      description: row.description,
      vehicleId: row.vehicleId,
      requesterId: row.requesterId,
      status: convertStrToEnum<REQUEST_STATUS>(REQUEST_STATUS, row.status),
      created: row?.created,
      deleted: row?.deleted,
      category: convertStrToEnum<REQUEST_CATEGORY>(REQUEST_CATEGORY, row?.category),
    };
  }
}

export class RequestCreateDto {
  @ApiProperty({ required: true })
  summary: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  vehicleId: string;
}
