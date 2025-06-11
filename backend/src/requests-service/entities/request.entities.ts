import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ description: 'Create user data' })
export class CreateRequest extends Request {
  @ApiProperty({ required: true })
  summary: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  vehicleId: string;
}

@ApiSchema({ description: 'Update request data' })
export class UpdateRequest extends Request {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: false })
  summary?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: true })
  vehicleId: string;
}