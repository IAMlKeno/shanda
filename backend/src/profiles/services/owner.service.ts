import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { garageOwner as GarageOwner } from 'src/mvc/models';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { ProfilesService } from './profiles.service';
import { GarageOwnerProfileDto } from '../dto/garage-owner/garage-owner.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GarageOwnerService extends BaseDbService<GarageOwner, GarageOwnerProfileDto> implements ProfilesService<GarageOwner, GarageOwnerProfileDto> {

  constructor(@InjectModel(GarageOwner) model: typeof GarageOwner) {
    super(model);
  }

  async getUserProfile(userId: string): Promise<GarageOwnerProfileDto> {
    const where = this.convertToWhere({ userId: userId })
    return this.mapToDto(await this.model.findOne(where));
  }

  mapToDto(model: GarageOwner): GarageOwnerProfileDto {
    return new GarageOwnerProfileDto(model);
  }
  mapToModel(dto: GarageOwnerProfileDto): MakeNullishOptional<GarageOwner> {
    return new GarageOwner(dto.info);
  }
}
