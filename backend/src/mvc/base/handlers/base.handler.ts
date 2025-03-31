// import { ListResultset } from '../data/list-resultset';
// import { IDtoWithId } from '../data/base-db.service';

export abstract class BaseHandler<DbServiceType extends IDbService<DtoType>, DtoType> {
  constructor(protected dbService: DbServiceType) {}

  async create(request: DtoType): Promise<DtoType> {
    return await this.dbService.create(request);
  }

  async update(request: DtoType, id: string): Promise<DtoType> {
    return await this.dbService.update(request, id);
  }

  async getAll(page: number, size: number, params: any[], orderBy?: Record<string, 'asc' | 'desc'>): Promise<Array<DtoType>> {
    return await this.dbService.getAll(page, size, params, orderBy);
  }

  async get(id: string): Promise<DtoType> {
    return await this.dbService.get(id);
  }

  async delete(id: string): Promise<void> {
    return await this.dbService.delete(id);
  }

  async getCustom<T extends new (item: any) => any>(params: Record<string, any>[], dtoConstructor?: T): Promise<InstanceType<T>> {
    return await this.dbService.getCustom(params, dtoConstructor);
  }

  async getAllCustom<T extends new (item: any) => any>(
    page: number,
    size: number,
    params: Record<string, any>[],
    dtoConstructor: T,
    orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Array<T>> {
    return await this.dbService.getAllCustom(page, size, params, dtoConstructor, orderBy);
  }

  async deleteCustom(params: Record<string, any>[]): Promise<void> {
    return await this.dbService.deleteCustom(params);
  }

  async updateMany(request: any, Ids: Array<string>): Promise<DtoType> {
    return await this.dbService.updateMany(request, Ids);
  }
}

export interface IDbService<DtoType> {
  create(request: DtoType): Promise<DtoType>;
  update(request: DtoType, id: string): Promise<DtoType>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<DtoType>;
  getAll(page: number, size: number, params: any[], orderBy?: Record<string, 'ASC' | 'DESC'>): Promise<Array<DtoType>>;
  deleteMany(conditions: { [key: string]: any }): Promise<void>;
  getCustom<T extends new (item: any) => any>(paramsArray: Record<string, any>[], dtoConstructor?: T): Promise<InstanceType<T>>;
  getAllCustom<T extends DtoType>(
    page: number,
    size: number,
    params: Record<string, any>[],
    dtoConstructor: new (item: any) => T,
    orderBy?: Record<string, 'ASC' | 'DESC'>,
  ): Promise<Array<T>>;
  deleteCustom(params: Record<string, any>[]): Promise<void>;
  updateMany(request: any, Ids: Array<string>): Promise<DtoType>;
}
