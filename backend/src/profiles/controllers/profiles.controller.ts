import { Controller, Get } from '@nestjs/common';
import { ProfileHandler } from '../handlers/profiles.handler';
import { ErrorResponse, Response } from 'src/mvc/base/http/entities';
import { ApiResponse } from '@nestjs/swagger';
import { PROFILE_TYPE } from 'src/mvc/enums/enum';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileHandler: ProfileHandler) {}

  @ApiResponse({
    isArray: true,
    type: Response<[ "owner", "provider", "requester" ]>,
    example: [ "owner", "provider", "requester" ]
  })
  @Get('/types')
  async getProfileTypes(): Promise<Response<string[]> | ErrorResponse> {
    return new Response<string[]>(Object.keys(PROFILE_TYPE));
  }
}
