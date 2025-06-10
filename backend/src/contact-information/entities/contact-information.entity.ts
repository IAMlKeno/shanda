import { ListResponse, Response } from "src/mvc/base/http/entities";
import { contactInformationAttributes as Model } from "src/mvc/models";
import { ContactInformationDto } from "../dto/contact-information.dto";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ description: 'Contact information create data' })
export class ContactInformationCreateDto {
  id?: string;
  @ApiProperty({ description: 'Phone number'})
  phone: string;
  @ApiProperty({ description: 'Email address'})
  email: string;
}

export interface ContactInformationRequest extends Model {}
export class ContactInformationResponse extends Response<Model> {
  constructor(data: ContactInformationDto) {
    super(data);
  }
}
export class ContactInformationListResponse extends ListResponse<Model> { }
