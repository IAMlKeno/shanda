import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Req } from '@nestjs/common';
import { VehicleDto } from '../dto/vehicle.dto';
import { BaseController } from 'src/mvc/base/base.controller';
import { VehicleHandler } from '../handlers/vehicle.handler';
import { VehicleResponse, VehicleListResponse, VehicleInformationResponse, InvalidVehicleVinResponse } from '../entities/vehicle-response.entities';
import { ErrorResponse, Response } from 'src/mvc/base/http/entities';
import { VehicleInfoDto } from '../dto/vehicle-info.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { INVALID_VIN, OPERATION_NOT_ALLOWED, VIN_NOT_FOUND } from 'src/constants';
import { API_DESCRIPTION_VIN_LOOKUP } from 'src/api-constants';
import { ApplyCrudApiResponses, extractUserFromRequest, isUserAdmin } from 'src/utils/misc.utils';
import { UpdateVehicleRequest, VehicleRequest } from '../entities/vehicle-request.entities';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { Request } from 'express';
import { MaintenanceLogHandler } from 'src/maintenance-log/handlers/maintenance-log.handler';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { VehicleLogDto } from 'src/maintenance-log/dto/maintenance-log.dto';
import { ProfileHandler } from 'src/profiles/handlers/profiles.handler';

@Controller('vehicles')
@ApiTags('Vehicles')
// @ApplyCrudApiResponses<VehicleRequest, UpdateVehicleRequest, VehicleResponse, VehicleListResponse>(VehicleRequest, UpdateVehicleRequest, VehicleResponse, VehicleListResponse)
export class VehiclesController extends BaseController<VehicleHandler, VehicleRequest, VehicleDto, VehicleResponse, VehicleListResponse> {

  constructor(
    handler: VehicleHandler,
    private readonly maintenanceLogHandler: MaintenanceLogHandler,
    private readonly profileHandler: ProfileHandler,
    private sequelize: Sequelize,
  ) { super(handler); }

  @ApiOperation({ summary: 'Creates a new vehicle.', description: 'Creates a new vehicle.', operationId: 'addVehicle' })
  @ApiBody({
    type: VehicleRequest,
    description: 'Adds a new vehicle',
  })
  @ApiCreatedResponse({ type: VehicleResponse, description: 'Successfully created the vehicle.' })
  @ApiBadRequestResponse({ description: 'Unable to complete the request, the vehicle may exist.' })
  @ApiInternalServerErrorResponse({ description: 'Failed to create the vehicle.' })
  @Post('/')
  async create(@Body() body: VehicleRequest, @Req() req: Request): Promise<VehicleResponse | ErrorResponse> {
    try {
      const user: UserAndProfileIdsDto = extractUserFromRequest(req);
      const dto: VehicleDto = this.createDtoFromRequest(body);
      const isAlreadyExists: boolean = Boolean(await this.handler.getShandaVehicleByVin(dto.info.vin));
      if (isAlreadyExists) {
        return new ErrorResponse('Already exists', HttpStatus.BAD_REQUEST);
      }


      // Get user, if its not admin, add garageid
      dto.info.garageId = (await this.profileHandler.requesterService.getMyGarage(user.id)).info.id;
      const response = await this.sequelize.transaction(async (t: Transaction) => {
        const createdLog: VehicleLogDto = await this.maintenanceLogHandler.create(new VehicleLogDto({}))
        dto.info.vehicleLog = createdLog.info.id;
        const item: VehicleDto = await this.handler.create(dto, t);
        return this.createResponseFromDto(item);
      })
      response.statusCode = HttpStatus.CREATED;
      return response;
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: API_DESCRIPTION_VIN_LOOKUP, operationId: 'vinLookup'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Vehicle Information', type: VehicleInformationResponse })
  @ApiBadRequestResponse({ description: INVALID_VIN, type: InvalidVehicleVinResponse })
  @ApiNotFoundResponse({ description: 'Failed to find any vehicle information', type: ErrorResponse })
  @ApiParam({ name: 'vin', example: 'WP1AA2A25DLA12497' })
  @ApiTags('garage')
  @Get('/vin/:vin')
  async vinLookup(@Param('vin') vin: string): Promise<VehicleInformationResponse | ErrorResponse> {
    try {
      if (!this.handler.isVinValid(vin)) {
        throw new BadRequestException();
      }

      let infoDto: VehicleInfoDto | any;
      let dto: any = await this.getShandaVehicleByVin(vin) ?? await this.handler.externalVinLookup(vin);
      if (!dto) {
        throw new Error('not found');
      }
      infoDto = this.maptoVehicleInfoDto(dto)
      return new VehicleInformationResponse(infoDto);
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        return new InvalidVehicleVinResponse();
      }
      return new ErrorResponse(VIN_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Remove a vehicle from your garage', description: 'Remove a vehicle from your garage', operationId: 'removeFromGarage' })
  @ApiOkResponse({ description: 'A boolean response if the operation was a success.' })
  @ApiInternalServerErrorResponse({ description: 'Failed to remove the vehicle.' })
  @Patch('/removeFromGarage/:vin')
  @ApiTags('garage')
  async removeFromGarage(@Param('vin') vin: string, @Req() req: Request): Promise<Response<boolean> | ErrorResponse> {
    try {
      const user: UserAndProfileIdsDto = extractUserFromRequest(req);
      const vehicle = await this.getShandaVehicleByVin(vin);
      if (!vehicle) throw new NotFoundException('Vehicle not found in shanda db');

      if (!isUserAdmin(user.id)) {
        // is user current owner of the vehicle
        if (!this.doesUserOwnVehicle(user.id, vin)) {
          return new Response<boolean>(false);
        }
      }
      // maybe update to accept garage id and verify the current user owns the garage
      // they are removing it from

      // this effectively makes the user no longer the owner
      await this.handler.update(new VehicleDto({ vin: vin, garageId: null }), vehicle.info.id);
      return new Response<boolean>(true);
    } catch (error: any) {
      return new ErrorResponse('false');
    }
  }

  @Delete('')
  delete() {
    return new ErrorResponse(OPERATION_NOT_ALLOWED, HttpStatus.METHOD_NOT_ALLOWED);
  }

  private async doesUserOwnVehicle(userId: string, vin: string): Promise<boolean> {
    const v: any = await this.handler.getCustom([{ vin: vin, userId: userId}])
    return Boolean(v);
  }

  private async getShandaVehicleByVin(vin: string): Promise<VehicleDto | undefined> {
    return await this.handler.getShandaVehicleByVin(vin);
  }

  private maptoVehicleInfoDto(dto: any): VehicleInfoDto {
    if (dto instanceof VehicleDto) {
      return new VehicleInfoDto({ ...dto.info.vehicleInformation, vehicleLog: dto.info.vehicleLog, vin: dto.info.vin});
    } else {
      return new VehicleInfoDto(dto);
    }
  }

  createDtoFromRequest(request: VehicleRequest): VehicleDto {
    return new VehicleDto(request);
  }
  createResponseFromDto(dto: any): VehicleResponse {
    return new VehicleResponse(dto);
  }
  createResponseList(list: VehicleDto[], total: number): VehicleListResponse {
    return new VehicleListResponse(list.map((item) => item.info), total);
  }
}
