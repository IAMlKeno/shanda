import { BadRequestException, Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { VehicleDto, VehicleRequest } from '../dto/vehicle.dto';
import { BaseController } from 'src/mvc/base/base.controller';
import { VehicleHandler } from '../handlers/vehicle.handler';
import { VehicleResponse, VehicleListResponse, VehicleInformationResponse, InvalidVehicleVinResponse } from '../entities/vehicle-response.entities';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { VehicleInfoDto } from '../dto/vehicle-info.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { INVALID_VIN } from 'src/constants';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController extends BaseController<VehicleHandler, VehicleRequest, VehicleDto, VehicleResponse, VehicleListResponse> {

  constructor(handler: VehicleHandler) { super(handler); }

  @ApiOperation({ summary: 'Create a request for the user ', operationId: 'vinLookup'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Vehicle Information', type: VehicleInformationResponse })
  @ApiBadRequestResponse({ description: INVALID_VIN, type: ErrorResponse })
  @ApiNotFoundResponse({ description: 'Failed to find any vehicle information', type: ErrorResponse })
  @ApiParam({ name: 'vin', example: 'WP1AA2A25DLA12497' })
  @ApiTags('garage')
  @Get('/vin/:vin')
  async vinLookup(@Param('vin') vin: string): Promise<VehicleInformationResponse | ErrorResponse> {
    try {
      const dto: VehicleDto = await this.handler.getCustom([{vin: vin}]);
      const infoDto: VehicleInfoDto = this.maptoVehicleInfoDto(dto)
      return new VehicleInformationResponse(infoDto);
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        return new InvalidVehicleVinResponse();
      }
      return new ErrorResponse('VIN information not found', HttpStatus.NOT_FOUND);
    }
  }

  private maptoVehicleInfoDto(dto: any): VehicleInfoDto {
    if (dto instanceof VehicleDto) {
      return new VehicleInfoDto({ ...dto.info.vehicleInformation, vehicleLog: dto.info.vehicleLog, vin: dto.info.vin});
    } else {
      return new VehicleInfoDto(dto);
    }
  }
  createDtoFromRequest(request: VehicleRequest): VehicleDto {
    throw new Error('Method not implemented.');
  }
  createResponseFromDto(dto: VehicleDto): VehicleResponse {
    throw new Error('Method not implemented.');
  }
  createResponseList(list: VehicleDto[], total: number): VehicleListResponse {
    throw new Error('Method not implemented.');
  }
}
