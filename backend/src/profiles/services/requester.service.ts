import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { requester as Requester } from 'src/mvc/models';
import { RequesterDto } from '../dto/requester/requester.dto';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { ProfilesService } from './profiles.service';
import { RequesterGarageHandler } from 'src/requester-garage/handlers/requester-garage.handler';
import { RequesterGarageDto } from 'src/requester-garage/dto/requester-garage.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RequesterService extends BaseDbService<Requester, RequesterDto> implements ProfilesService<Requester, RequesterDto> {

  constructor(@InjectModel(Requester) model: typeof Requester, private readonly garageHandler: RequesterGarageHandler) {
    super(model);
  }

  async create(request: RequesterDto): Promise<RequesterDto> {
    if (!request.requester.userId) throw new Error(' missing user id');

    const row = this.mapToModel(request);
    // create their garage first;
    const garage = await this.garageHandler.create({ garage: {
      nickname: 'WILD NAME',
      location: {},
      ownerId: row.id,
    }} as RequesterGarageDto)
    row.garageId = garage.garage.id;
    const createdRow = await this.model.create(row);

    return this.mapToDto(createdRow);
  }

  async getUserProfile(userId: string): Promise<RequesterDto> {
    const where = this.convertToWhere({ userId: userId });
    return this.mapToDto(await this.model.findOne(where));
  }


  async createRequest(req: any) {}
  async getRequest(id: string) {}
  async updateRequest(id: string, req: any) {}
  async deleteRequest(id: string) {}
  async getRequestReceipt(id: string) {}
  async getReceiptById(id: string) {}
  async getMyGarage(userId: string) {}



  mapToDto(model: Requester): RequesterDto {
    return new RequesterDto(model);
  }
  mapToModel(dto: RequesterDto): MakeNullishOptional<Requester> {
    return new Requester(dto.requester);
  }
}
