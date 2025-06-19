import { Body, Controller, Get, HttpStatus, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { UserHandler } from '../handler/user.handler';
import { UserListResponse, UserProfileUpdateRequest, UserRequest, UserResponse } from '../entities/user.entity';
import { UserAndProfileIdsDto, UserDto } from '../dto/user.dto';
import { ProfileHandler } from 'src/profiles/handlers/profiles.handler';
import { ContactInformationHandler } from 'src/contact-information/handlers/contact-information.handler';
import { ApiExcludeEndpoint, ApiFoundResponse, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse, Response } from 'src/mvc/base/http/entities';
import { Request } from 'express';
import { PROFILE_TYPE } from 'src/mvc/enums/enum';
import { ProfileDto } from 'src/profiles/dto/profile.dto';
import { OPERATION_NOT_ALLOWED } from 'src/constants';

@ApiTags('users')
@Controller('users')
export class UsersController extends BaseController<UserHandler, UserRequest, UserDto, UserResponse, UserListResponse> {

  constructor(
    userHandler: UserHandler,
    private readonly profileHandler: ProfileHandler,
    private readonly contactHandler: ContactInformationHandler,
  ) {
    super(userHandler);
  }

  createDtoFromRequest(request: UserRequest): UserDto {
    return new UserDto(request);
  }
  createResponseFromDto(dto: any): UserResponse {
    return new UserResponse(dto);
  }
  createResponseList(users: UserDto[], total: number): UserListResponse {
    return new UserListResponse(users.map((user) => user.info), total);
  }

  @ApiExcludeEndpoint()
  @Post('/')
  async create(body: any) { return new ErrorResponse(OPERATION_NOT_ALLOWED, HttpStatus.METHOD_NOT_ALLOWED); }

  @ApiExcludeEndpoint()
  @Get('/')
  async get(body: any) { return new ErrorResponse(OPERATION_NOT_ALLOWED, HttpStatus.METHOD_NOT_ALLOWED); }

  @ApiExcludeEndpoint()
  @Get('/')
  async getAll(page: number, size: number, query: string, req: any) { return new ErrorResponse(OPERATION_NOT_ALLOWED, HttpStatus.METHOD_NOT_ALLOWED); }

  @ApiExcludeEndpoint()
  @Patch('/')
  async update(body: any) { return new ErrorResponse(OPERATION_NOT_ALLOWED, HttpStatus.METHOD_NOT_ALLOWED); }

  @ApiOperation({ summary: 'Get the successfully authenticated user and profiles.', operationId: 'loadUser' })
  @ApiFoundResponse({ type: UserResponse, description: 'A full user object containing references to its profiles.' })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Failed to find user.' })
  @ApiHeader({ name: 'user-token', description: 'User auth token' })
  @Get('/me')
  async getMyUser(@Req() req: Request): Promise<UserResponse | ErrorResponse> {
    try {
      const userInfo = {};
      const user = (req?.user as UserAndProfileIdsDto);
      userInfo['me'] = user;
      userInfo['me']['contactInfo'] = (await this.contactHandler.get(user.contactInfoId)).info;
      let loadedProfile: ProfileDto;
      switch(user.lastprofileloaded) {
        case PROFILE_TYPE.owner:
          loadedProfile = await this.profileHandler.garageOwnerService.getUserProfile(user.id);
          break;
        case PROFILE_TYPE.provider:
          loadedProfile = await this.profileHandler.providerService.getUserProfile(user.id);
          break;
        default:
          loadedProfile = await this.profileHandler.requesterService.getUserProfile(user.id);
      }
      userInfo['profile'] = loadedProfile;

      return this.createResponseFromDto(userInfo);
    } catch(error: any) {
      return new ErrorResponse(error, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Update the last profile the user user.', operationId: 'updateDefaultProfile' })
  @ApiResponse({ type: Boolean, description: 'True or false of whether the account successfully updated.', status: HttpStatus.OK })
  @ApiResponse({ type: ErrorResponse, description: 'The account failed to udpate and something went wrong.', status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiHeader({ name: 'user-token', description: 'User auth token' })
  @Post('profile')
  async updateUserLastProfile(@Body() body: UserProfileUpdateRequest, @Req() req: Request): Promise<Response<boolean> | ErrorResponse> {
    try {
      const userId: string = (req?.user as UserAndProfileIdsDto)?.id;
      const response: boolean = await this.handler.updateUserLastProfile(userId, body.profile);

      return new Response(response, HttpStatus.OK);
    } catch(error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
