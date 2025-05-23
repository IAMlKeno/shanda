import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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

@Controller('register')
export class RegistrationController {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userHandler: UserHandler,
    private readonly userController: UsersController,
    private readonly profileHandler: ProfileHandler,
    private readonly contactHandler: ContactInformationHandler,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Creates a user entry using ssoid from Auth0', operationId: 'registerUser'})
  @ApiHeader({ name: 'user-token', description: 'auth0 authentation token (jwt)'})
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

      const contact: ContactInformationDto = await this.contactHandler.create(new ContactInformationDto(user.contactInfo));
      user.contactInfo.id = contact.info.id ?? '';
      const userDto: UserDto = await this.userHandler.create(this.userController.createDtoFromRequest(user));

      // create profiles
      Promise.all([
        // need a garage owner dto where id, and garage are nullable
        this.profileHandler.garageOwnerService.create(new GarageOwnerDto({
          user: userDto.user.id,
          contactInfoId: contact.info.id // contact info should be on user
        })),
        this.profileHandler.providerService.create(new ProviderDto({
          userId: userDto.user.id,
          contactInfoId: contact.info.id,
        })),
        this.profileHandler.requesterService.create(new RequesterDto({
          userId: userDto.user.id,
          garageId: '', // Probably initiate garage creation in that handler
        })),
      ]);

      return this.userController.createResponseFromDto(userDto);
    } catch (error) {
      return new ErrorResponse({ message: JSON.stringify(error) });
    }
  }
}
