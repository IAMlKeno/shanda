import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { UsersService } from "../services/users.service";
import { UserDto } from "../dto/user.dto";
import { IBaseHandler } from "src/mvc/base/base.controller";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserHandler extends BaseHandler<UsersService, UserDto> {

  constructor(dbService: UsersService) {
    super(dbService);
  }

  async getUserAndProfiles(userId: string): Promise<any> {
    return await this.dbService.getUserAndProfiles(userId);
  }

}