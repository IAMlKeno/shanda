import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from './http/entities';

@Controller('base')
export abstract class BaseController<HandlerType extends IBaseHandler<DtoType>, RequestType, DtoType extends object, ResponseType, ListResponseType> {
  protected handler: HandlerType;

  // protected logger: Logger;

  constructor(handler: HandlerType) {
    this.handler = handler;
    // this.logger = new Logger(this.constructor.name);
  }
  abstract createDtoFromRequest(request: RequestType): DtoType;
  abstract createResponseFromDto(dto: DtoType): ResponseType;
  abstract createResponseList(list: Array<DtoType>, total: number): ListResponseType;

  @Post('/')
  async create(@Body() body: RequestType): Promise<ResponseType | ErrorResponse> {
    try {
      const dto: DtoType = this.createDtoFromRequest(body);
      const item: DtoType = await this.handler.create(dto);
      const response: ResponseType = this.createResponseFromDto(item);
      return response;
    } catch (error: any) {
      return new ErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<ResponseType | Error> {
    try {
      const item: DtoType = await this.handler.get(id);
      const response: ResponseType = this.createResponseFromDto(item);

      return response;
    } catch (error) {
      return new Error(error);
    }
  }

  @Get('')
  async getAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('query') query: string,
    @Req() req,
  ): Promise<ListResponseType | Error> {
    try {
      const params: any[] = this.convertQueryToArray(req.url);
      // probably need that second query to get all results?
      const items: Array<DtoType> = await this.handler.getAll(page, size, params);
      const response: ListResponseType = this.createResponseList(items, items.length);

      return response;
    } catch (error) {
      return new Error(error);
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: RequestType): Promise<ResponseType | Error> {
    try {
      const dto: DtoType = this.createDtoFromRequest(body);
      const item: DtoType = await this.handler.update(dto, id);
      const response: ResponseType = this.createResponseFromDto(item);

      return response;
    } catch (error) {
      return new Error(error);
    }
  }

  /**
 * example usage:
 *  const params: any[] = this.convertQueryToArray(req.url, { auctionId: auctionId });
 *
 * @param uri
 * @param additionalParams
 * @protected
 */
  protected convertQueryToArray(uri: string, additionalParams?: { [key: string]: any }): Array<Record<string, any>> {
    return [];
    // return convertQueryToArray(uri, additionalParams);
  }

  protected createDtoArray<DtoType>(body: any[], dtoType: new (item: any) => DtoType, additionalValues?: { [key: string]: any }): DtoType[] {
    const values: DtoType[] = body.map((item: any) => {
      // Merge the item with any additional values provided
      const itemWithAdditionalValues: any = { ...item, ...additionalValues };
      return new dtoType(itemWithAdditionalValues);
    });

    return values;
  }
}
export interface IBaseHandler<DtoType> {
  delete(id: string): Promise<void>;
  get(id: string): Promise<DtoType>;
  create(req: DtoType): Promise<DtoType>;
  update(req: DtoType, id: string): Promise<DtoType>;
  getAll(page: number, size: number, params: any[], orderBy?: Record<string, 'ASC' | 'DESC'>): any;
  getAllCustom<T extends new (item: any) => any>(
    page: number,
    size: number,
    params: Record<string, any>[],
    dtoConstructor: T,
    orderBy?: Record<string, 'ASC' | 'DESC'>,
  ): Promise<Array<T>>;
}

/*
SAMPLE ADDING SWAGGER CONTEXT TO A CONTROLLER
// src/users/users.controller.ts
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users') // Tag for grouping
@Controller('users')
export class UsersController {

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: UserEntity, isArray: true }) 
  @Get()
  findAll() { 
    // ... your controller logic 
  }

  // Add decorators for other endpoints 
}
*/