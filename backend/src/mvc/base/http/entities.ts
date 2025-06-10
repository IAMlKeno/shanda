import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Response as ExpressResponse, Request as ExpressRequest } from "express";

export class Response<T> implements Partial<ExpressResponse> {
  statusCode?: number;
  data: T;

  constructor(data: any) {
    this.data = data;
  }
}
export class ErrorResponse extends Response<any> {

  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.statusCode = Number(statusCode.toFixed(0));
  }

  statusCode?: number;
  @ApiProperty()
  msg?: string;
}

export class ListResponse<T> extends Response<Array<T>> {
  @ApiProperty()
  count: number;
  @ApiProperty()
  totalCount: number;

  constructor(data: Array<any>, total: number) {
    super(data);
    this.count = data.length;
    this.totalCount = total;
  }
}

export class Request implements Partial<ExpressRequest> {}