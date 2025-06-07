import { Body, Controller, forwardRef, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { UserRequest, UserResponse } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserHandler } from 'src/users/handler/user.handler';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { UsersController } from '../users.controller';
import { UserDto } from 'src/users/dto/user.dto';
import { ContactInformationDto } from 'src/contact-information/dto/contact-information.dto';
import { ProfileHandler } from 'src/profiles/handlers/profiles.handler';
import { ContactInformationHandler } from 'src/contact-information/handlers/contact-information.handler';
import { GarageOwnerDto } from 'src/profiles/dto/garage-owner/garage-owner.dto';
import { ProviderDto } from 'src/profiles/dto/provider/provider.dto';
import { RequesterDto } from 'src/profiles/dto/requester/requester.dto';
import { Sequelize } from 'sequelize-typescript';
import { AccountMappingHandler } from 'src/users/handler/account-mapping.handler';
import { AccountMappingDto } from 'src/users/dto/account-mapping.dto';
import { Transaction } from 'sequelize';
import { AUTH_HEADER_TOKEN } from 'src/constants';

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
        userCreateRequest.user.contactInfoId = contact.info.id ?? '';
        const createdUser: UserDto = await this.userHandler.create(userCreateRequest, t);

        await this.accountMappingHandler.create(new AccountMappingDto({ userId: createdUser.user.id, ssoid: authId }), t);

      // create profiles
      await this.profileHandler.garageOwnerService.create(new GarageOwnerDto({
          user: createdUser.user.id,
          contactInfo: createdUser.user.contactInfoId,
        }), t);
        await this.profileHandler.providerService.create(new ProviderDto({
          userId: createdUser.user.id,
          contactInfoId: createdUser.user.contactInfoId,
        }), t);
        await this.profileHandler.requesterService.create(new RequesterDto({
          contactInfoId: createdUser.user.contactInfoId,
          userId: createdUser.user.id,
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
