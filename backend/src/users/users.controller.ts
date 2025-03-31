import { Controller  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { BaseController } from 'src/mvc/base/base.controller';
import { UserHandler } from './handler/user.handler';
import { UserListResponse, UserRequest, UserResponse } from './entities/user.entity';

@Controller('users')
export class UsersController extends BaseController<UserHandler, UserRequest, CreateUserDto | UpdateUserDto, UserResponse, UserListResponse> {

  constructor(private userHandler: UserHandler) {
    super(userHandler);
  }
  createDtoFromRequest(request: UserRequest): CreateUserDto | UpdateUserDto {
    throw new Error('Method not implemented.');
  }
  createResponseFromDto(dto: CreateUserDto | UpdateUserDto): UserResponse {
    throw new Error('Method not implemented.');
  }
  createResponseList(list: (CreateUserDto | UpdateUserDto)[]): UserListResponse {
    throw new Error('Method not implemented.');
  }
}
