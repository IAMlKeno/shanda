import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProfileHandler } from '../handlers/profiles.handler';
import { RequesterProfileDto } from '../dto/requester/requester.dto';
import { VehicleRequestDto } from '../dto/requester/request.dto';
import { RequestsHandler } from 'src/requests-service/handlers/requests.handler';
import { RequestListReponse, RequestResponse } from 'src/requests-service/entities/request-response.entity';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { RequestDto } from 'src/requests-service/dtos/requests.dto';
import { CreateRequest, UpdateRequest } from 'src/requests-service/entities/request.entities';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { Request } from 'express';
import { PROFILE_TYPE, REQUEST_STATUS } from 'src/mvc/enums/enum';
import { Op } from 'sequelize';
import { RequesterProfileResponse } from '../entities/requester-profile.entities';
import { RequesterGarageHandler } from 'src/requester-garage/handlers/requester-garage.handler';
import { RequesterGarageDto } from 'src/requester-garage/dto/requester-garage.dto';
import { RequesterGarageResponse } from 'src/requester-garage/entities/requester-garage-response.entities';
import { extractUserFromRequest } from 'src/utils/misc.utils';

@ApiTags('profiles')
@Controller('profiles/requester')
export class RequesterController {

  constructor(
    private readonly profileHandler: ProfileHandler,
    private readonly requestsHandler: RequestsHandler,
    private readonly garageHandler: RequesterGarageHandler,
    private sequelize: Sequelize,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get requester\s profile', operationId: 'getMyRequesterProfile'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Profile found', type: RequesterProfileResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Failed to locate requester profile', type: ErrorResponse })
  @ApiTags('profiles/requester')
  @Get('')
  async getRequesterProfileByUserId(@Req() req: Request): Promise<RequesterProfileResponse> {
    try {
      const user: UserAndProfileIdsDto = (req?.user as UserAndProfileIdsDto);
      const profileId: string = user?.requesterId;
      const response: RequesterProfileDto = await this.profileHandler.requesterService.get(profileId);
      this.profileHandler.userService
        .updateUserLastProfile(user?.id, PROFILE_TYPE.requester)
        .catch((error: any) => {
          console.log(`An error occurred while updating the default profile: ${error}`);
        });
        // If garageId is null, create a garage for the user
      if (!response?.info?.garageId) {
        response.info.garageId = await this.sequelize.transaction(async (t: Transaction) => {
            const id = (await this.createGarage(t)).info.id;
            this.profileHandler.requesterService.update(new RequesterProfileDto({ garageId: id }), profileId);

            return id;
          })
          .catch((error: any) => {
            console.log(`Failed to create garage for user: ${error}`);
            return undefined;
          }
        );
      }

      return new RequesterProfileResponse(response.info, HttpStatus.FOUND);
    } catch(error: any) {
      return new ErrorResponse(error, HttpStatus.NOT_FOUND);
    }
  }

  private async createGarage(transactionHost?: Transaction): Promise<RequesterGarageDto> {
    return this.garageHandler.create(new RequesterGarageDto({ id: undefined }), transactionHost);
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
  @ApiQuery({ name: 'status', description: 'One of the statuses "open", "closed", or "pending"', required: false })
  @ApiQuery({ name: 'query', description: 'A text to use to search for a request (fields: description, summary)', required: false })
  @ApiQuery({ name: 'vehicle', description: 'The id of the vehicle', required: false })
  @ApiTags('requests')
  @Get('/requests')
  async getRequests(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('status') _status: REQUEST_STATUS | undefined = REQUEST_STATUS.open,
  ): Promise<RequestListReponse | ErrorResponse> {
    try {
      const requesterId: string = (req?.user as UserAndProfileIdsDto)?.requesterId;
      let params: Record<string, any> = { 'requesterId': requesterId, 'deleted': { [Op.is]: null } };
      params = this.convertQueryToRecord(req.query, params);

      const response: RequestDto[] = await this.requestsHandler.getAll(page, size, params);
      return RequestListReponse.mapToListResponse(response);
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Soft delete a request for the user ', operationId: 'deleteRequest'})
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

  protected convertQueryToRecord(url: any, params: Record<string | symbol, any>) {
    if (!url || url.length < 1) return params;

    const skipQ = ['size', 'page']
    const fields = ['summary', 'description'];
    let queryOp = {};
    Object.entries(url).forEach(([key, value]) => {
      if (skipQ.includes(key)) return;
      switch(key) {
        case 'query':
          fields.forEach((field: string) => {
            queryOp[field] = { [Op.iLike]: `%${value}%` };
          })

          params = { ...params, [Op.and]: { [Op.or]: queryOp } };
          break;
        case 'vehicle':
          params = { ...params, "vehicleId": value }
          break
        default:
          params[key] = value;
      }
    });

    return params;
  }
}
