import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ description: 'Add vehicle by vin.' })
export class AddVehicleToGarageRequest extends Request {
  @ApiProperty({ required: true })
  vin: string;
}
