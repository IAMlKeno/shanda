import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProfileHandler } from '../handlers/profiles.handler';
import { RequesterDto } from '../dto/requester/requester.dto';
import { VehicleRequestDto } from '../dto/requester/request.dto';

@Controller('profiles/requester')
export class RequesterController {

  constructor(private readonly profileHandler: ProfileHandler) {}

  @Get('/:id')
  async getRequesterProfileByUserId(@Param('id') userId: string): Promise<any> {}

  @Get('garage')
  async getMyGarage(@Req() req): Promise<any> {
    const userId = 'from-a-token';
    this.profileHandler.requesterService.getMyGarage(userId);
  }

  @Post('/request')
  async createRequest(@Body() body: any, @Req() req): Promise<RequesterDto> {
    return await this.profileHandler.requesterService.create(body);
  }

  @Get('/request/:id')
  async getRequest(@Param('id') id: string) {
    this.profileHandler.requesterService.getRequest(id);
  }
  @Patch('/request/:id')
  async updateRequest(@Body() body: any, @Param('id') id: string) {
    this.profileHandler.requesterService.updateRequest(id, body);
  }
  @Delete('/request/:id')
  async deleteRequest(@Param('id') id: string) {
    this.profileHandler.requesterService.delete(id);
  }
  @Get('/request/:id/receipt')
  async getRequestReceipt(@Param('id') id: string) {
    return this.profileHandler.requesterService.getRequestReceipt(id);
  }
  @Get('/request/receipt/:id')
  async getReceiptById(@Param('id') id: string) {
    this.profileHandler.requesterService.getReceiptById(id);
  }
}
