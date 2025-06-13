import { BaseDbService } from 'src/mvc/base/data/base.service';
import { garageOwner as GarageOwner, requester as Requester, serviceProvider as ServiceProvider } from 'src/mvc/models';
import { RequesterProfileDto } from '../dto/requester/requester.dto';
import { GarageOwnerProfileDto } from '../dto/garage-owner/garage-owner.dto';
import { ProviderProfileDto } from '../dto/provider/provider.dto';

export interface ProfilesService<P extends Requester | GarageOwner | ServiceProvider, DTO extends RequesterProfileDto|GarageOwnerProfileDto|ProviderProfileDto> extends BaseDbService<P, DTO> {

  getUserProfile(userId: string): Promise<DTO>;

}
