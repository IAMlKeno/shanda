import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileHandler } from '../handlers/profiles.handler';
import { ProviderProfileResponse } from '../entities/provider-profile.entities';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { ProviderProfileDto } from '../dto/provider/provider.dto';
import { Request } from 'express';

@ApiTags('profiles')
@Controller('profiles/provider')
export class ProviderController {
  constructor(
    private readonly profileHandler: ProfileHandler,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get provider\'s profile', operationId: 'getMyProviderProfile'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Profile found', type: ProviderProfileResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Failed to locate provider profile', type: ErrorResponse })
  @ApiTags('profiles/provider')
  @Get('')
  async getProviderProfileByUserId(@Req() req: Request): Promise<ProviderProfileResponse> {
    try {
      const requesterId: string = (req?.user as UserAndProfileIdsDto)?.requesterId;
      const response: ProviderProfileDto = await this.profileHandler.providerService.get(requesterId);

      return new ProviderProfileResponse(response.info, HttpStatus.FOUND);
    } catch(error: any) {
      return new ErrorResponse(error, HttpStatus.NOT_FOUND);
    }
  }
}
