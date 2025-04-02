import { Injectable } from '@nestjs/common';
import { BaseDbService } from 'src/mvc/base/data/base.service';
import { serviceProvider as ServiceProvider } from 'src/mvc/models';
import { ProviderDto } from '../dto/provider/provider.dto';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { ProfilesService } from './profiles.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProviderService extends BaseDbService<ServiceProvider, ProviderDto> implements ProfilesService<ServiceProvider, ProviderDto> {

  constructor(@InjectModel(ServiceProvider) model: typeof ServiceProvider) {
    super(model);
  }

  async getUserProfile(userId: string): Promise<ProviderDto> {
    const where = this.convertToWhere({ userId: userId })
    return this.mapToDto(await this.model.findOne(where));
  }

  mapToDto(model: ServiceProvider): ProviderDto {
    return new ProviderDto(model);
  }
  mapToModel(dto: ProviderDto): MakeNullishOptional<ServiceProvider> {
    return new ServiceProvider(dto.provider);
  }
}
