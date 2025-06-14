import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ description: 'Vehicle request' })
export class VehicleRequest extends Request {
  @ApiProperty({ required: true })
  vin: string;
  @ApiProperty({ required: true })
  vehicleInformation: object;
  @ApiProperty({ required: true })
  garageId: string;
}

@ApiSchema()
export class UpdateVehicleRequest {
  @ApiProperty({ required: true })
  vehicleInformation: object;
}