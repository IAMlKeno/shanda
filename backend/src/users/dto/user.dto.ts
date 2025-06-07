import { convertStringToUserStatusEnum } from "src/mvc/enums/enum";
import { userAttributes as User } from "src/mvc/models";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { InputType } from "src/common/form-map";
import { Transform } from "class-transformer";

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
      // status: convertStringToUserStatusEnum(row.status ?? 'pending'),
      status: row?.status ?? 'pending',
      contactInfoId: row.contactInfoId,
    }; // convert to enum val
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
