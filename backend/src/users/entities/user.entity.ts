import { ListResponse, Response } from "src/mvc/base/http/entities";
import { userAttributes as User } from "src/mvc/models";

export interface UserRequest extends User {
  contactInfo: {
    phone: string,
    email: string,
  };
 }

export interface UserResponse extends User, Omit<Response, 'status'> {
  profiles?: any[]; //this will be the provider, requester and garageOwner profiles. Probably just a reference
}
export interface UserListResponse extends ListResponse<User> { }
