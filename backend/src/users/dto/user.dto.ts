import { userAttributes as User } from "src/mvc/models";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { InputType } from "src/common/form-map";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { API_DESCRIPTION_OWNER_ID, API_DESCRIPTION_PROVIDER_ID, API_DESCRIPTION_REQUESTER_ID } from "src/constants";
import { convertStrToEnum, UserStatus } from "src/mvc/enums/enum";

export class UserDto {
  user: UserType;

  constructor(row: any) {
    this.user = {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      created: row.created,
      deleted: row.deleted,
      username: row.username,
      status: row?.status ? convertStrToEnum<UserStatus>(UserStatus, row.status) : UserStatus.pending,
      contactInfoId: row.contactInfoId,
    };
  }
}

export class UserRegistrationDto {
  @IsString()
  @IsNotEmpty()
  @InputType({ type: 'text', additionalParams: { label: 'First Name' } })
  @Transform(({ value }) => value || '')
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @InputType({ type: 'text', additionalParams: { label: 'Last Name' } })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @InputType({ type:'text', subtype: 'email', additionalParams: { label: 'Email' } })
  email: string;

}

export interface UserType extends User {}

export class UserAndProfileIdsDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty({ description: API_DESCRIPTION_REQUESTER_ID })
  requesterId?: string;
  @ApiProperty({ description: API_DESCRIPTION_PROVIDER_ID })
  providerId?: string;
  @ApiProperty({ description: API_DESCRIPTION_OWNER_ID })
  ownerId?: string;
  @ApiProperty({ enum: Object.keys(UserStatus), description: 'User\'s status', enumName: 'USER_STATUS' })
  status: string;

  constructor(row: any) {
    this.id = row.id;
    this.username = row.username;
    this.requesterId = row.requesterid;
    this.providerId = row.providerid;
    this.ownerId = row.ownerid;
    this.status = row.id;
  }
}