import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { BaseController } from 'src/mvc/base/base.controller';
import { RequesterGarageHandler } from '../handlers/requester-garage.handler';
import { RequesterGarageDto } from '../dto/requester-garage.dto';
import { RequesterGarageListResponse, RequesterGarageResponse } from '../entities/requester-garage-response.entities';
import { AddVehicleToGarageRequest } from '../entities/requester-garage.entities';
import { Request } from 'express';
import { VehicleHandler } from 'src/vehicles/handlers/vehicle.handler';
import { extractUserFromRequest } from 'src/utils/misc.utils';
import { UserAndProfileIdsDto } from 'src/users/dto/user.dto';
import { VehicleDto } from 'src/vehicles/dto/vehicle.dto';
import { ErrorResponse, Response } from 'src/mvc/base/http/entities';
import { VehicleExistsInAnotherGarageResponse } from 'src/vehicles/entities/vehicle-response.entities';
import { ProfileHandler } from 'src/profiles/handlers/profiles.handler';
import { DEFAULT_RESULT_PAGE, DEFAULT_RESULT_SIZE } from 'src/constants';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('requester/garage')
@ApiTags('garage')
export class RequesterGarageController extends BaseController<RequesterGarageHandler, AddVehicleToGarageRequest, RequesterGarageDto, RequesterGarageResponse, RequesterGarageListResponse> {

  constructor(
    handler: RequesterGarageHandler,
    private readonly vehicleHandler: VehicleHandler,
    private readonly requesterHandler: ProfileHandler,
  ) { super(handler); }

  @ApiOperation({
    summary: 'Adds a vehicle to your garage if it\'s available',
    description: 'Add a vehicle to your garage. It will not be added if it exists in another garage.',
    operationId: 'addVehicleToMyGarage'
  })
  @ApiBody({ type: AddVehicleToGarageRequest, description: 'Add vehicle to garage request' })
  @ApiOkResponse({ description: 'A boolean response if the operation was a success.' })
  @ApiBadRequestResponse({ description: 'Specifies that the vehicle exists.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Specifies that the vehicle exists.' })
  @Post('/addVehicle')
  async addToMyGarage(@Body() vehicleReq: AddVehicleToGarageRequest, @Req() req: Request): Promise<Response<boolean> | ErrorResponse> {
    try {
      const user: UserAndProfileIdsDto = extractUserFromRequest(req);
      const vehicle: VehicleDto = await this.vehicleHandler.getCustom([{ vin: vehicleReq.vin }]);

      if (!vehicle) {
        return new ErrorResponse('INVALID VEHICLE ADDITION');
      }

      if (!this.isAlreadyInAnotherGarage(vehicle)) {
        // proceed with adding.
        const garage: RequesterGarageDto = await this.requesterHandler.requesterService.getMyGarage(user.id);
        await this.vehicleHandler.update(new VehicleDto({ garageId: garage.info.id }), vehicle.info.id);

        return new Response<boolean>(true);
      } else {
        return new VehicleExistsInAnotherGarageResponse();
      }
    } catch(error: any) {
      return new ErrorResponse('An error occured adding to garage');
    }
  }

  @ApiOperation({ summary: 'Get your garage and the vehicles in it.', description: 'Get your garage and the vehicles in it.', operationId: 'getMyGarage'
  })
  @ApiResponse({ type: RequesterGarageResponse, description: 'Get your garage.' })
  @ApiNotFoundResponse({ description: 'Something occurred and could not find garage.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Something failed along the way.' })
  @Get('/')
  @ApiTags('something')
  async getMyGarage(@Req() req: Request): Promise<RequesterGarageResponse | ErrorResponse> {
    try {
      const user: UserAndProfileIdsDto = extractUserFromRequest(req);
      const garage: RequesterGarageDto = await this.requesterHandler.requesterService.getMyGarage(user.id);
      garage.vehicles = await this.vehicleHandler.getAll(DEFAULT_RESULT_PAGE, DEFAULT_RESULT_SIZE, { garageId: garage.info.id });

      return new RequesterGarageResponse(garage);
    } catch(error: any) {
      return new ErrorResponse('Failed to find garage', HttpStatus.NOT_FOUND);
    }
  }

  private isAlreadyInAnotherGarage(vehicle: VehicleDto): boolean {
    return Boolean(vehicle.info?.garageId);
  }

  createDtoFromRequest(request: AddVehicleToGarageRequest): RequesterGarageDto {
    throw new Error('Method not implemented.');
  }
  createResponseFromDto(dto: RequesterGarageDto): RequesterGarageResponse {
    throw new Error('Method not implemented.');
  }
  createResponseList(list: RequesterGarageDto[], total: number): RequesterGarageListResponse {
    throw new Error('Method not implemented.');
  }
}
