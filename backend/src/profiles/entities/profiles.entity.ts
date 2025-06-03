import { ListResponse } from "src/mvc/base/http/entities";
import { PROFILE_STATUS } from "src/mvc/enums/enum";

export interface Profile { id: string, userId: string; status: PROFILE_STATUS }
export interface ServiceProvider extends Profile { companyInformation?: any; }
export interface Requester extends Profile { garage: any; }
export interface GarageOwner extends Profile {}
export interface ProfileRequest {}

export class ProfileListResponse extends ListResponse<Profile> { }