import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { API_DESCRIPTION_LAST_PROFILE } from "src/api-constants";
import { ContactInfo } from "src/contact-information/dto/contact-information.dto";
import { ContactInformationCreateDto } from "src/contact-information/entities/contact-information.entity";
import { ListResponse, Request, Response } from "src/mvc/base/http/entities";
import { PROFILE_TYPE } from "src/mvc/enums/enum";
import { userAttributes as User } from "src/mvc/models";
import { ProfileDto } from "src/profiles/dto/profile.dto";

@ApiSchema({ description: 'Create user data' })
export class UserRequest extends Request {
  @ApiProperty()
  firstName: string;
  @ApiProperty({ required: true })
  lastName?: string;
  @ApiProperty()
  username: string;
  @ApiProperty({ description: 'phone, email', required: true })
  contactInfo: ContactInformationCreateDto;
}
@ApiSchema({ description: 'Update the user default profile' })
export class UserProfileUpdateRequest extends Request {
  @ApiProperty({
    enum: Object.keys(PROFILE_TYPE),
    enumName: 'PROFILE_TYPE',
    description: API_DESCRIPTION_LAST_PROFILE,
  })
  profile: PROFILE_TYPE;
}

@ApiSchema({ name: 'UserResponse' })
export class UserResponse extends Response<Omit<User, 'contactInfoId'>> {
  @ApiProperty({
    type: 'object',
    properties: {
      profile: { oneOf: [
        { $ref: '#/components/schemas/RequesterProfileDto' },
        { $ref: '#/components/schemas/ProviderProfileDto' },
        { $ref: '#/components/schemas/GarageOwnerProfileDto' },
      ] }
    }
  })
  data: any;

  constructor(data: any) {
    super(data);
  }
}
export class UserListResponse extends ListResponse<User> { }
