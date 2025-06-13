import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { serviceProvider as ServiceProvider } from 'src/mvc/models';
import { ProviderProfileDto } from '../dto/provider/provider.dto';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { ProfilesService } from './profiles.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProviderService extends BaseDbService<ServiceProvider, ProviderProfileDto> implements ProfilesService<ServiceProvider, ProviderProfileDto> {

  constructor(@InjectModel(ServiceProvider) model: typeof ServiceProvider) {
    super(model);
  }

  async getUserProfile(userId: string): Promise<ProviderProfileDto> {
    const where = this.convertToWhere({ userId: userId })
    return this.mapToDto(await this.model.findOne(where));
  }

  mapToDto(model: ServiceProvider): ProviderProfileDto {
    return new ProviderProfileDto(model);
  }
  mapToModel(dto: ProviderProfileDto): MakeNullishOptional<ServiceProvider> {
    return new ServiceProvider(dto.info);
  }
}
