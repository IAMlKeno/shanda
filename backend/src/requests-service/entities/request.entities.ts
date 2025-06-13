import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { API_DESCRIPTION_REQUEST_CATEGORY, API_DESCRIPTION_REQUEST_TAGS } from "src/api-constants";
import { REQUEST_CATEGORY, REQUEST_TAGS } from "src/mvc/enums/enum";

@ApiSchema({ description: 'Create user data' })
export class CreateRequest extends Request {
  @ApiProperty({ required: true })
  summary: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  vehicleId: string;

  @ApiProperty({
    description: API_DESCRIPTION_REQUEST_TAGS,
    isArray: true,
    enum: Object.keys(REQUEST_TAGS),
    enumName: 'REQUEST_TAGS',
    required: false,
  })
  tags?: REQUEST_TAGS[];
  @ApiProperty({
    description: API_DESCRIPTION_REQUEST_CATEGORY,
    enum: Object.keys(REQUEST_CATEGORY),
    enumName: 'REQUEST_CATEGORY',
    required: false,
    default: REQUEST_CATEGORY.service_request,
  })
  category?: REQUEST_CATEGORY;
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
  @ApiProperty({
    description: API_DESCRIPTION_REQUEST_TAGS,
    isArray: true,
    enum: Object.keys(REQUEST_TAGS),
    enumName: 'REQUEST_TAGS',
  })
  tags?: REQUEST_TAGS[];
  @ApiProperty({
    description: API_DESCRIPTION_REQUEST_CATEGORY,
    isArray: true,
    enum: Object.keys(REQUEST_CATEGORY),
    enumName: 'REQUEST_CATEGORY',
  })
  category?: REQUEST_CATEGORY;
}