import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { UsersService } from "../services/users.service";
import { UserDto } from "../dto/user.dto";
import { Injectable } from "@nestjs/common";
import { PROFILE_TYPE } from "src/mvc/enums/enum";

@Injectable()
export class UserHandler extends BaseHandler<UsersService, UserDto> {

  constructor(dbService: UsersService) {
    super(dbService);
  }

  async getUserAndProfiles(userId: string): Promise<any> {
    return await this.dbService.getUserAndProfiles(userId);
  }

  async getUserByAuthId(userId: string): Promise<UserDto | undefined> {
    return await this.dbService.getUserByAuthId(userId);
  }

  async updateUserLastProfile(userId: string, profile: PROFILE_TYPE): Promise<boolean> {
    return await this.dbService.updateUserLastProfile(userId, profile);
  }

}