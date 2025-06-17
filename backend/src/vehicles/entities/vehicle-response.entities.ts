import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { ErrorResponse, ListResponse, Response } from "src/mvc/base/http/entities";
import { VehicleDto } from "../dto/vehicle.dto";
import { VehicleInfoDto } from "../dto/vehicle-info.dto";
import { EXISTS_IN_ANOTHER_GARAGE, INVALID_VIN } from "src/constants";
import { HttpStatus } from "@nestjs/common";

@ApiSchema()
export class VehicleResponse extends Response<VehicleDto> {
  @ApiProperty({ type: VehicleDto })
  data;

  constructor(data: VehicleDto) {
    super(data);
  }
}

@ApiSchema()
export class VehicleInformationResponse extends Response<VehicleInfoDto> {
  @ApiProperty({ type: VehicleInfoDto })
  data: VehicleInfoDto;

  constructor(data: VehicleInfoDto) {
    super(data);
  }
}
@ApiSchema()
export class InvalidVehicleVinResponse extends ErrorResponse {
  constructor() {
    super(INVALID_VIN, HttpStatus.BAD_REQUEST);
  }
}
@ApiSchema()
export class VehicleExistsInAnotherGarageResponse extends ErrorResponse {
  constructor() {
    super(EXISTS_IN_ANOTHER_GARAGE, HttpStatus.BAD_REQUEST);
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
