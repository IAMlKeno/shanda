import { Response as ExpressResponse } from "express";

export interface Response extends Partial<ExpressResponse> {

}

export interface ListResponse<T> extends Response {
  count: number;
  totalCount: number;
  results: Array<T>;
}
