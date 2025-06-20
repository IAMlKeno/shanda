import { Body, Controller, forwardRef, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRequest, UserResponse } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserHandler } from 'src/users/handler/user.handler';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { UsersController } from '../users.controller';
import { UserDto } from 'src/users/dto/user.dto';
import { ContactInformationDto } from 'src/contact-information/dto/contact-information.dto';
import { ProfileHandler } from 'src/profiles/handlers/profiles.handler';
import { ContactInformationHandler } from 'src/contact-information/handlers/contact-information.handler';
import { GarageOwnerProfileDto } from 'src/profiles/dto/garage-owner/garage-owner.dto';
import { ProviderProfileDto } from 'src/profiles/dto/provider/provider.dto';
import { RequesterProfileDto } from 'src/profiles/dto/requester/requester.dto';
import { Sequelize } from 'sequelize-typescript';
import { AccountMappingHandler } from 'src/users/handler/account-mapping.handler';
import { AccountMappingDto } from 'src/users/dto/account-mapping.dto';
import { Transaction } from 'sequelize';
import { AUTH_HEADER_TOKEN } from 'src/constants';
import { UserStatus } from 'src/mvc/enums/enum';

@Controller('register')
export class RegistrationController {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userHandler: UserHandler,
    private readonly userController: UsersController,
    private readonly profileHandler: ProfileHandler,
    @Inject(forwardRef(() => ContactInformationHandler))
    private readonly contactHandler: ContactInformationHandler,
    @Inject(forwardRef(() => AccountMappingHandler))
    private readonly accountMappingHandler: AccountMappingHandler,
    private sequelize: Sequelize,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Creates a user entry using ssoid from Auth0', operationId: 'registerUser'})
  @ApiHeader({ name: AUTH_HEADER_TOKEN, description: 'auth0 authentation token (jwt)'})
  @ApiResponse({ status: 201, description: 'User created', type: UserResponse })
  @ApiResponse({ status: 500, description: 'Failed to create user and profiles', type: ErrorResponse })
  @Post('/')
  async register(@Req() req: Request, @Body() user: UserRequest): Promise<UserResponse | ErrorResponse> {
    try {
      const token: string = req.headers['user-token'];
      const parsedToken: any = this.jwtService.decode(token);
      const authId: string = parsedToken['sub'] ?? '';
      if (!authId) {
        // throw error - no auth0 "sub" user id
        throw new Error('Invalid user data');
      }

      // let userDto: UserDto;
      const userDto: any = await this.sequelize.transaction(async (t: Transaction) => {
        const contactCreateRequest = new ContactInformationDto(user.contactInfo);
        const contact: ContactInformationDto = await this.contactHandler.create(contactCreateRequest, t);
        let userCreateRequest = this.userController.createDtoFromRequest(user);
        userCreateRequest.info.contactInfoId = contact.info.id ?? '';
        userCreateRequest.info.status = UserStatus.pending;
        const createdUser: UserDto = await this.userHandler.create(userCreateRequest, t);

        await this.accountMappingHandler.create(new AccountMappingDto({ userId: createdUser.info.id, ssoid: authId }), t);

        // create profiles
        await this.profileHandler.garageOwnerService.create(new GarageOwnerProfileDto({
          user: createdUser.info.id,
          contactInfo: createdUser.info.contactInfoId,
        }), t);
        await this.profileHandler.providerService.create(new ProviderProfileDto({
          userId: createdUser.info.id,
          contactInfoId: createdUser.info.contactInfoId,
        }), t);
        await this.profileHandler.requesterService.create(new RequesterProfileDto({
          contactInfoId: createdUser.info.contactInfoId,
          userId: createdUser.info.id,
        }), t);
        return createdUser;
      }).catch((error) => {
        throw error;
      });
      return this.userController.createResponseFromDto(userDto);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
