import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileHandler } from '../handlers/profiles.handler';
import { ProviderProfileResponse } from '../entities/provider-profile.entities';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { ProviderProfileDto } from '../dto/provider/provider.dto';
import { Request } from 'express';
import { PROFILE_TYPE } from 'src/mvc/enums/enum';

@ApiTags('Profiles')
@Controller('profiles/provider')
export class ProviderController {
  constructor(
    private readonly profileHandler: ProfileHandler,
  ) { }

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get provider\'s profile', operationId: 'getMyProviderProfile' })
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Profile found', type: ProviderProfileResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Failed to locate provider profile', type: ErrorResponse })
  @ApiTags('profiles/provider')
  @Get('')
  async getProviderProfileByUserId(@Req() req: Request): Promise<ProviderProfileResponse> {
    try {
      const user: UserAndProfileIdsDto = (req?.user as UserAndProfileIdsDto);
      const profileId: string = user.providerId;
      const response: ProviderProfileDto = await this.profileHandler.providerService.get(profileId);
      this.profileHandler.userService
        .updateUserLastProfile(user?.id, PROFILE_TYPE.provider)
        .catch((error: any) => {
          console.log(`An error occurred while updating the default profile: ${error}`);
        });

      return new ProviderProfileResponse(response.info, HttpStatus.FOUND);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.NOT_FOUND);
    }
  }
}
