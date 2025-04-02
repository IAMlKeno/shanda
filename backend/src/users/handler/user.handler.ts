import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { UsersService } from "../users.service";
import { UserDto } from "../dto/user.dto";
import { IBaseHandler } from "src/mvc/base/base.controller";

export class UserHandler extends BaseHandler<UsersService, UserDto> implements IBaseHandler<UserDto> {

  constructor(dbService: UsersService) {
    super(dbService);
  }

  async getUserAndProfiles(userId: string): Promise<any> {
    return await this.dbService.getUserAndProfiles(userId);
  }

}