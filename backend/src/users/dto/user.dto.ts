import { convertStringToUserStatusEnum } from "src/mvc/enums/enum";
import { userAttributes as User } from "src/mvc/models";

export class UserDto {
  user: UserType;

  constructor(row: any) {
    this.user.id = row.id;
    this.user.firstName = row.firstName;
    this.user.lastName = row.lastName;
    this.user.created = row.created;
    this.user.deleted = row.deleted;
    this.user.username = row.username;
    this.user.status = convertStringToUserStatusEnum(row.status); // convert to enum val
  }
}

export interface UserType extends User {}
