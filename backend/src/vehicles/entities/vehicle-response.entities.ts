import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { ListResponse, Response } from "src/mvc/base/http/entities";
import { VehicleDto } from "../dto/vehicle.dto";

@ApiSchema()
export class VehicleResponse extends Response<VehicleDto> {
  constructor(data: VehicleDto) {
    super(data);
  }
}

@ApiSchema()
export class VehicleListResponse extends ListResponse<VehicleDto> {
  @ApiProperty({ isArray: true, type: VehicleDto, })
  data: Array<VehicleDto>;

  static mapToListResponse(list: any[], total?: number): VehicleListResponse {
    return new VehicleListResponse(list.map((item: VehicleDto) => item.info), total);
  }
}
