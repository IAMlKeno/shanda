import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProfileHandler } from '../handlers/profiles.handler';
import { RequesterDto } from '../dto/requester/requester.dto';
import { VehicleRequestDto } from '../dto/requester/request.dto';
import { RequestsHandler } from 'src/requests-service/handlers/requests.handler';
import { RequestListReponse, RequestResponse } from 'src/requests-service/entities/request-response.entity';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { RequestDto } from 'src/requests-service/dtos/requests.dto';
import { CreateRequest, UpdateRequest } from 'src/requests-service/entities/request.entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { Request } from 'express';

@ApiTags('profiles')
@Controller('profiles/requester')
export class RequesterController {

  constructor(
    private readonly profileHandler: ProfileHandler,
    private readonly requestsHandler: RequestsHandler,
    private sequelize: Sequelize,
  ) {}

  // @Get('/:id')
  // async getRequesterProfileByUserId(@Param('id') userId: string): Promise<any> {}

  @Get('garage')
  async getMyGarage(@Req() req): Promise<any> {
    const userId = 'from-a-token';
    this.profileHandler.requesterService.getMyGarage(userId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a request for the user ', operationId: 'createRequest'})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Request created', type: RequestResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to create a request', type: ErrorResponse })
  @ApiTags('requests')
  @Post('/request')
  async createRequest(@Body() body: CreateRequest, @Req() req: any): Promise<RequestResponse | ErrorResponse> {
    try {
      const requesterId: string = (req?.user as UserAndProfileIdsDto)?.requesterId;
      const requestDto: RequestDto = await this.requestsHandler.create(new RequestDto({ ...body, requesterId: requesterId }));

      return new RequestResponse(requestDto.info, HttpStatus.CREATED);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a request for the user ', operationId: 'updateRequest'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Request created', type: RequestResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to create a request', type: ErrorResponse })
  @ApiTags('requests')
  @Patch('/request/:id')
  async updateRequest(@Param('id') id: string, @Body() body: UpdateRequest): Promise<RequestResponse | ErrorResponse> {
    try {
      const response: RequestDto = await this.sequelize.transaction(async (t: Transaction) => {
        return await this.requestsHandler.update(new RequestDto(body), id, t);
      });
      return new RequestResponse(response.info, HttpStatus.OK);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get a request for the user ', operationId: 'getRequest'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Got request', type: RequestResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Failed to get a request', type: ErrorResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to get a request', type: ErrorResponse })
  @ApiTags('requests')
  @Get('/request/:id')
  async getRequest(@Param('id') id: string) {
    try {
      const response: RequestDto | undefined = await this.requestsHandler.get(id);
      if (!response) {
        return new ErrorResponse('Request not found', HttpStatus.NOT_FOUND);
      }

      return new RequestResponse(response.info, HttpStatus.FOUND);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all requests for the user', operationId: 'getRequests'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Got requests', type: RequestListReponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to get list of requests', type: ErrorResponse })
  @ApiTags('requests')
  @Get('/requests')
  async getRequests(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('query') query: string,
  ): Promise<RequestListReponse | ErrorResponse> {
    try {
      const requesterId: string = (req?.user as UserAndProfileIdsDto)?.requesterId;
      const params: Record<string, any> = {};
      params['requesterId'] = requesterId;
      const response: RequestDto[] = await this.requestsHandler.getAll(page, size, params);
      return RequestListReponse.mapToListResponse(response);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a request for the user ', operationId: 'deletRequest'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Request delete' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Failed to delete a request', type: ErrorResponse })
  @ApiTags('requests')
  @Delete('/request/:id')
  async deleteRequest(@Param('id') id: string) {
    try {
      await this.requestsHandler.delete(id);
      return HttpStatus.NO_CONTENT;
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
