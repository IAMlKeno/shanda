import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GarageOwnerProfileResponse } from '../entities/owner-profile.entities';
import { GarageOwnerProfileDto } from '../dto/garage-owner/garage-owner.dto';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { ProfileHandler } from '../handlers/profiles.handler';
import { Request } from 'express';

@ApiTags('profiles')
@Controller('garage-owner')
export class GarageOwnerController {
  constructor(
    private readonly profileHandler: ProfileHandler,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get garage owner\s profile', operationId: 'getMyOwnerProfile'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Profile found', type: GarageOwnerProfileResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Failed to locate owner profile', type: ErrorResponse })
  @ApiTags('profiles/owner')
  @Get('')
  async getProviderProfileByUserId(@Req() req: Request): Promise<GarageOwnerProfileResponse> {
    try {
      const requesterId: string = (req?.user as UserAndProfileIdsDto)?.requesterId;
      const response: GarageOwnerProfileDto = await this.profileHandler.garageOwnerService.get(requesterId);

      return new GarageOwnerProfileResponse(response.info, HttpStatus.FOUND);
    } catch(error: any) {
      return new ErrorResponse(error, HttpStatus.NOT_FOUND);
    }
  }
}
