import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ description: 'Vehicle request' })
export class VehicleRequest extends Request {
  @ApiProperty({ required: true })
  vin: string;
  @ApiProperty({
    required: true,
    example: {
      make: "Toyotya",
      trim: "LE",
      year: 2020,
      color: "red",
      model: "Corolla",
      mileage: 50000
    }
  })
  vehicleInformation: object;
  garageId: string;
}

@ApiSchema()
export class UpdateVehicleRequest {
  @ApiProperty({ required: true })
  vehicleInformation: object;
}