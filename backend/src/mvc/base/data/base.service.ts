import { Model, ModelCtor } from 'sequelize-typescript';
import { IDbService } from "../handlers/base.handler";
import { Injectable } from '@nestjs/common';
// MakeNullishOptional: https://sequelize.org/api/v7/types/_sequelize_core.index._internal_.makenullishoptional
import { MakeNullishOptional } from 'sequelize/types/utils';
// FindOptions: https://sequelize.org/api/v7/interfaces/_sequelize_core.index.findoptions
import { FindOptions } from 'sequelize';

//https://stackoverflow.com/questions/69051499/typescript-repository-pattern-with-sequelize
@Injectable()
export abstract class BaseDbService<M extends Model, DtoType> implements IDbService<DtoType> {
  // export abstract class BaseDbService<M extends Model, DtoType> implements IDbService<DtoType> {

  constructor(protected readonly model: ModelCtor<M>) { }

  async create(request: DtoType): Promise<DtoType> {
    const row = this.mapToModel(request);
    const createdRow = await this.model.create(row);

    return this.mapToDto(createdRow);
  }

  async update(request: DtoType, id: string): Promise<DtoType> {
    const record = await this.model.findByPk(id);
    if (!record) {
      return null;
    }
    const updatedRow = await record.update(this.mapToModel(request));

    return this.mapToDto(updatedRow);
  }

  async delete(id: string): Promise<void> {
    const rowsRemoved = this.model.destroy(this.convertToWhere({ id: id }));
  }

  async get(id: string): Promise<DtoType> {
    const row = await this.model.findByPk<M>(id);
    return this.mapToDto(row);
  }

  async getAll(page: number, size: number, params: Record<string, any>, orderBy?: Record<string, 'ASC' | 'DESC'>): Promise<(DtoType)[]> {
    const results: DtoType[] = [];
    try {
      let where = this.convertToWhere(params);
      where['limit'] = size;
      where['offset'] = page;
      where['order'] = Object.entries(orderBy);
      const rows: M[] = await this.model.findAll(where);
      rows.forEach((row: M) => {
        results.push(this.mapToDto(row));
      });
    } catch(e) {}
    finally { return results; };
  }
  deleteMany(conditions: { [key: string]: any; }): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getCustom<T extends new (item: any) => any>(paramsArray: Record<string, any>[], dtoConstructor?: T): Promise<InstanceType<T>> {
    throw new Error("Method not implemented.");
  }
  getAllCustom<T>(page: number, size: number, params: Record<string, any>[], dtoConstructor: new (item: any) => T, orderBy?: Record<string, 'ASC' | 'DESC'>): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  deleteCustom(params: Record<string, any>[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateMany(request: any, ids: Array<string>): Promise<DtoType> {
    throw new Error("Method not implemented.");
  }

  abstract mapToDto(model: M): DtoType;
  abstract mapToModel(dto: DtoType): MakeNullishOptional<M>;

  /**
   * Build the where clause.
   * @see https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses
   * @param params 
   * @returns 
   */
  convertToWhere(params: Record<string, any>): FindOptions<M> {
    return { where: params };
  }

}
