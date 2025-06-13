import { userAttributes as User } from "src/mvc/models";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { InputType } from "src/common/form-map";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { API_DESCRIPTION_OWNER_ID, API_DESCRIPTION_PROVIDER_ID, API_DESCRIPTION_REQUESTER_ID } from "src/constants";
import { convertStrToEnum, PROFILE_TYPE, UserStatus } from "src/mvc/enums/enum";
import { API_DESCRIPTION_CONTACT_ID, API_DESCRIPTION_LAST_PROFILE } from "src/api-constants";

export class UserDto {
  info: UserType;

  constructor(row: any) {
    this.info = {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      created: row.created,
      deleted: row.deleted,
      username: row.username,
      status: convertStrToEnum<UserStatus>(UserStatus, row.status),
      contactInfoId: row.contactInfoId,
      lastprofileloaded: row.lastprofileloaded,
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
  @ApiProperty({ description: API_DESCRIPTION_CONTACT_ID })
  contactInfoId?: string;
  @ApiProperty({
    enum: Object.keys(PROFILE_TYPE),
    enumName: 'PROFILE_TYPE',
    description: API_DESCRIPTION_LAST_PROFILE
  })
  lastprofileloaded?: PROFILE_TYPE;

  constructor(row: any) {
    this.id = row.id;
    this.username = row.username;
    this.requesterId = row.requesterid;
    this.providerId = row.providerid;
    this.ownerId = row.ownerid;
    this.status = row.status;
    this.contactInfoId = row.contactInfoId;
    this.lastprofileloaded = row?.lastprofileloaded;
  }
}