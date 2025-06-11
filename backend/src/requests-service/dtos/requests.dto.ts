import { requestAttributes } from "src/mvc/models";
import { ApiProperty } from "@nestjs/swagger";

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

  constructor(row: any) {
    this.info = {
      id: row.id,
      summary: row.summary,
      description: row.description,
      vehicleId: row.vehicleId,
      requesterId: row.requesterId,
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
