export abstract class BaseHandler<DbServiceType extends IDbService<DtoType>, DtoType> {
  constructor(protected dbService: DbServiceType) {}

  async create(request: DtoType, transactionHost?: any): Promise<DtoType> {
    return await this.dbService.create(request, transactionHost);
  }

  async update(request: DtoType, id: string, transactionHost?: any): Promise<DtoType> {
    return await this.dbService.update(request, id, transactionHost);
  }

  async getAll(page: number, size: number, params: Record<string, any>, orderBy?: Record<string, 'ASC' | 'DESC'>): Promise<Array<DtoType>> {
    return await this.dbService.getAll(page, size, params, orderBy);
  }

  async get(id: string): Promise<DtoType> {
    return await this.dbService.get(id);
  }

  async delete(id: string, transactionHost?: any): Promise<void> {
    return await this.dbService.delete(id);
  }

  async getCustom<T extends new (item: any) => any>(params: Record<string, any>[]): Promise<DtoType> {
    return await this.dbService.getCustom(params);
  }

  async getAllCustom<T extends new (item: any) => any>(
    page: number,
    size: number,
    params: Record<string, any>[],
    dtoConstructor: T,
    orderBy?: Record<string, 'ASC' | 'DESC'>,
  ): Promise<Array<T>> {
    return await this.dbService.getAllCustom(page, size, params, dtoConstructor, orderBy);
  }

  async deleteCustom(params: Record<string, any>[], transactionHost?: any): Promise<void> {
    return await this.dbService.deleteCustom(params);
  }

  async updateMany(request: any, Ids: Array<string>, transactionHost?: any): Promise<DtoType> {
    return await this.dbService.updateMany(request, Ids);
  }
}

export interface IDbService<DtoType> {
  create(request: DtoType, transactionHost?: any): Promise<DtoType>;
  update(request: DtoType, id: string, transactionHost?: any): Promise<DtoType>;
  /**
   * Soft delete the object
   * @param id
   * @param transactionHost 
   */
  delete(id: string, transactionHost?: any): Promise<void>;
  get(id: string): Promise<DtoType>;
  getAll(page: number, size: number, params: Record<string, any>, orderBy?: Record<string, 'ASC' | 'DESC'>): Promise<Array<DtoType>>;
  deleteMany(conditions: { [key: string]: any }, transactionHost?: any): Promise<void>;
  getCustom(paramsArray: Record<string, any>[]): Promise<DtoType>;
  getAllCustom<T extends DtoType>(
    page: number,
    size: number,
    params: Record<string, any>[],
    dtoConstructor: new (item: any) => T,
    orderBy?: Record<string, 'ASC' | 'DESC'>,
  ): Promise<Array<T>>;
  deleteCustom(params: Record<string, any>[], transactionHost?: any): Promise<void>;
  updateMany(request: any, Ids: Array<string>, transactionHost?: any): Promise<DtoType>;
}
