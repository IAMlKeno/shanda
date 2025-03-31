import { userAttributes as User } from "src/mvc/models";

export interface UserRequest extends User { }

export interface UserResponse extends User { }
export interface UserListResponse extends ListResponse<User> { }
export interface ListResponse<T> {
  count: number;
  totalCount: number;
  results: Array<T>;
}