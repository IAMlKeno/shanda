import { convertStringToUserStatusEnum } from "src/mvc/enums/enum";
import { userAttributes as User } from "src/mvc/models";

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
      status: convertStringToUserStatusEnum(row.status),
      contactInfoId: row.contactInfoId,
    }; // convert to enum val
  }
}

export interface UserType extends User {}
