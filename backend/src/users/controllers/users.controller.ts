import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { UserHandler } from '../handler/user.handler';
import { UserListResponse, UserRequest, UserResponse } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { ProfileHandler } from 'src/profiles/handlers/profiles.handler';
import { GarageOwnerDto } from 'src/profiles/dto/garage-owner/garage-owner.dto';
import { ProviderDto } from 'src/profiles/dto/provider/provider.dto';
import { RequesterDto } from 'src/profiles/dto/requester/requester.dto';
import { ContactInformationHandler } from 'src/contact-information/handlers/contact-information.handler';
import { ContactInformationDto } from 'src/contact-information/dto/contact-information.dto';
import { ApiFoundResponse, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/mvc/base/http/entities';

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
    return new UserListResponse(users.map((user) => user.user), total);
  }

  @ApiOperation({ summary: 'Get the successfully authenticated user and profiles.', operationId: 'loadUser'})
  @ApiFoundResponse({ type: UserResponse, description: 'A full user object containing references to its profiles.' })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Failed to find user.' })
  @ApiHeader({ name: 'user-token', description: 'User auth token' })
  @Get('/me')
  async getMyUser(@Req() req: Request): Promise<UserResponse | ErrorResponse> {
    const token = req.headers['user-token'];
    console.log(token);
    const userInfo = {};
    userInfo['me'] = await this.handler.get(token);
    userInfo['me']['contactInfo'] = await this.contactHandler.get(userInfo['me'].user.contactInfoId);
    userInfo['profiles'] = [];
    userInfo['profiles'].push(await this.profileHandler.requesterService.getUserProfile(userInfo['me'].user.id));

    return this.createResponseFromDto(userInfo);
  }

  @Get('/requester')
  async getRequesterProfile(@Req() req: Request): Promise<any> {
    // probably add some interceptor that can extract user token from the request
    const token = req.headers['user-token'];
    const requester = await this.profileHandler.requesterService.getUserProfile(token);
    const garageId = requester.requester.garageId;
    const garage = await this.profileHandler.requesterService.getGarageById(garageId);

    return { requester, garage };
  }

  @Get('/provider')
  async getProviderProfile(@Req() req: Request): Promise<any> {
    // probably add some interceptor that can extract user token from the request
    return 'I\'m a service provider';
    const validationToken: any = '';
    this.handler.getUserAndProfiles(validationToken);
  }

  @Get('/owner')
  async getOwnerProfile(@Req() req: Request): Promise<any> {
    // probably add some interceptor that can extract user token from the request
    return 'I\'m a garage ownder';
    const validationToken: any = '';
    this.handler.getUserAndProfiles(validationToken);
  }

  @Post('/')
  async createUserAndProfiles(@Body() body: UserRequest, @Req() req): Promise<UserResponse> {
    const dto: UserDto = this.createDtoFromRequest(body);
    const result: UserDto = await this.handler.create(dto);
    const contact: ContactInformationDto = await this.contactHandler.create(new ContactInformationDto(body.contactInfo));

    // create profiles
    Promise.all([
      // need a garage owner dto where id, and garage are nullable
      this.profileHandler.garageOwnerService.create(new GarageOwnerDto({
        user: result.user.id,
        contactInfoId: contact.info.id // contact infor should lbe on user
      })),
      this.profileHandler.providerService.create(new ProviderDto({
        userId: result.user.id,
        contactInfoId: contact.info.id,
      })),
      this.profileHandler.requesterService.create(new RequesterDto({
        userId: result.user.id,
        garageId: '',//probably initiate garage creation in that handler
      })),
    ]);

    return this.createResponseFromDto(result);
  }

}
