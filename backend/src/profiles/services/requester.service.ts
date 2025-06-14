import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { requester as Requester } from 'src/mvc/models';
import { RequesterProfileDto } from '../dto/requester/requester.dto';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { ProfilesService } from './profiles.service';
import { RequesterGarageHandler } from 'src/requester-garage/handlers/requester-garage.handler';
import { RequesterGarageDto } from 'src/requester-garage/dto/requester-garage.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RequesterService extends BaseDbService<Requester, RequesterProfileDto> implements ProfilesService<Requester, RequesterProfileDto> {

  constructor(
    @InjectModel(Requester) model: typeof Requester,
    private readonly garageHandler: RequesterGarageHandler,
  ) {
    super(model);
  }

  async getUserProfile(userId: string): Promise<RequesterProfileDto> {
    const where = this.convertToWhere({ userId: userId });
    return this.mapToDto(await this.model.findOne(where));
  }

  async getMyGarage(userId: string): Promise<RequesterGarageDto> {
    const garageId = (await this.getUserProfile(userId)).info.garageId;
    const garage = await this.getGarageById(garageId);
    return garage;
  }

  async getGarageById(id: string): Promise<RequesterGarageDto> {
    return this.garageHandler.getGarageById(id);
  }


  async getRequest(id: string) {}
  async deleteRequest(id: string) {}
  async getRequestReceipt(id: string) {}
  async getReceiptById(id: string) {}

  mapToDto(model: Requester): RequesterProfileDto {
    return new RequesterProfileDto(model);
  }
  mapToModel(dto: RequesterProfileDto): MakeNullishOptional<Requester> {
    return new Requester(dto.info);
  }
}
