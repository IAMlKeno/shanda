import { BaseHandler } from "src/mvc/base/handlers/base.handler";
import { UsersService } from "../users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/user.dto";

export class UserHandler extends BaseHandler<UsersService, CreateUserDto | UpdateUserDto> {

  constructor(private userService: UsersService) {
    super(userService); //
  }

}