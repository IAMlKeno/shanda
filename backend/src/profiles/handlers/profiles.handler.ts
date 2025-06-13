import { UsersService } from "src/users/services/users.service";
import { GarageOwnerService } from "../services/owner.service";
import { ProviderService } from "../services/provider.service";
import { RequesterService } from "../services/requester.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfileHandler {

  constructor(
    readonly garageOwnerService: GarageOwnerService,
    readonly providerService: ProviderService,
    readonly requesterService: RequesterService,
    readonly userService: UsersService,
  ) { }

}
