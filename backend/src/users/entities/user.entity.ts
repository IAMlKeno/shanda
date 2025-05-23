import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { ContactInfo } from "src/contact-information/dto/contact-information.dto";
import { ListResponse, Request, Response } from "src/mvc/base/http/entities";
import { userAttributes as User } from "src/mvc/models";

@ApiSchema({ description: 'Create user data' })
export class UserRequest extends Request {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  contactInfo: {
    id?: string,
    phone: string,
    email: string,
  };
 }

export class UserResponse extends Response<Omit<User, 'contactInfoId'>> {
  constructor(data: any) {
    super(data);
  }
  @ApiProperty()
  profiles?: any[]; //this will be the provider, requester and garageOwner profiles. Probably just a reference
  @ApiProperty()
  contactInfo: ContactInfo;
}
export class UserListResponse extends ListResponse<User> { }
