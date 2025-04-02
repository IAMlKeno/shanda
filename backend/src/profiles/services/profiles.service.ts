import { BaseDbService } from 'src/mvc/base/data/base.service';
import { garageOwner as GarageOwner, requester as Requester, serviceProvider as ServiceProvider } from 'src/mvc/models';
import { RequesterDto } from '../dto/requester/requester.dto';
import { GarageOwnerDto } from '../dto/garage-owner/garage-owner.dto';
import { ProviderDto } from '../dto/provider/provider.dto';

export interface ProfilesService<P extends Requester | GarageOwner | ServiceProvider, DTO extends RequesterDto|GarageOwnerDto|ProviderDto> extends BaseDbService<P, DTO> {

  getUserProfile(userId: string): Promise<DTO>;

}
