import { requestAttributes } from "src/mvc/models";
import { ApiProperty } from "@nestjs/swagger";
import { convertStrToEnum, REQUEST_STATUS } from "src/mvc/enums/enum";

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

  constructor(row: any) {
    this.info = {
      id: row.id,
      summary: row.summary,
      description: row.description,
      vehicleId: row.vehicleId,
      requesterId: row.requesterId,
      status: convertStrToEnum<REQUEST_STATUS>(REQUEST_STATUS, row.status),
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
