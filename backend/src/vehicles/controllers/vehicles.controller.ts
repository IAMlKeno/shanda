import { BadRequestException, Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { VehicleDto } from '../dto/vehicle.dto';
import { BaseController } from 'src/mvc/base/base.controller';
import { VehicleHandler } from '../handlers/vehicle.handler';
import { VehicleResponse, VehicleListResponse, VehicleInformationResponse, InvalidVehicleVinResponse } from '../entities/vehicle-response.entities';
import { ErrorResponse } from 'src/mvc/base/http/entities';
import { VehicleInfoDto } from '../dto/vehicle-info.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { INVALID_VIN, VIN_NOT_FOUND } from 'src/constants';
import { API_DESCRIPTION_VIN_LOOKUP } from 'src/api-constants';
import { ApplyCrudApiResponses } from 'src/utils/misc.utils';
import { UpdateVehicleRequest, VehicleRequest } from '../entities/vehicle-request.entities';

@Controller('vehicles')
@ApiTags('Vehicles')
@ApplyCrudApiResponses<VehicleRequest, UpdateVehicleRequest, VehicleResponse, VehicleListResponse>(VehicleRequest, UpdateVehicleRequest, VehicleResponse, VehicleListResponse)
export class VehiclesController extends BaseController<VehicleHandler, VehicleRequest, VehicleDto, VehicleResponse, VehicleListResponse> {

  constructor(handler: VehicleHandler) { super(handler); }

  @ApiOperation({ summary: API_DESCRIPTION_VIN_LOOKUP, operationId: 'vinLookup'})
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Vehicle Information', type: VehicleInformationResponse })
  @ApiBadRequestResponse({ description: INVALID_VIN, type: ErrorResponse })
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
      let dto: any = await this.handler.getCustom([{vin: vin}]) ?? await this.handler.externalVinLookup(vin);
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
