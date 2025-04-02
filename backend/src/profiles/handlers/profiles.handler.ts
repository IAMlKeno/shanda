import { GarageOwnerService } from "../services/owner.service";
import { garageOwner, requester, serviceProvider, vehicleGarage } from "src/mvc/models";
import { ProviderService } from "../services/provider.service";
import { RequesterService } from "../services/requester.service";
import { RequesterGarageHandler } from "src/requester-garage/handlers/requester-garage.handler";
import { RequesterGarageService } from "src/requester-garage/services/requester-garage.service";

export class ProfileHandler {

  constructor(
    readonly garageOwnerService: GarageOwnerService,
    readonly providerService: ProviderService,
    readonly requesterService: RequesterService,
  ) { 
    this.garageOwnerService = new GarageOwnerService(garageOwner);
    this.requesterService = new RequesterService(requester, new RequesterGarageHandler(new RequesterGarageService(vehicleGarage)));
    this.providerService = new ProviderService(serviceProvider);
  }

}
