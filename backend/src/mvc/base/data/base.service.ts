import { Model, ModelCtor } from 'sequelize-typescript';
import { IDbService } from "../handlers/base.handler";
import { Injectable } from '@nestjs/common';
// MakeNullishOptional: https://sequelize.org/api/v7/types/_sequelize_core.index._internal_.makenullishoptional
import { MakeNullishOptional } from 'sequelize/types/utils';
// FindOptions: https://sequelize.org/api/v7/interfaces/_sequelize_core.index.findoptions
import { FindOptions } from 'sequelize';
import { DEFAULT_RESULT_PAGE, DEFAULT_RESULT_SIZE } from 'src/constants';
import { isArray } from 'class-validator';

//https://stackoverflow.com/questions/69051499/typescript-repository-pattern-with-sequelize
@Injectable()
export abstract class BaseDbService<M extends Model, DtoType> implements IDbService<DtoType> {

  constructor(protected readonly model: ModelCtor<M>) { }

  async create(request: DtoType, transactionHost?: any): Promise<DtoType> {
    const row = this.mapToModel(request);
    let createdRow: any;
    if (transactionHost) {
      createdRow = await this.model.create(row.dataValues, { transaction: transactionHost});
    } else {
      createdRow = await this.model.create(row.dataValues);
    }

    return this.mapToDto(createdRow);
  }

  async update(request: DtoType, id: string, transactionHost?: any): Promise<DtoType> {
    const record = await this.model.findByPk(id);
    if (!record) {
      return null;
    }
    const data: any = {
      ...(request as any)?.info
    };
    record.set(data);
    await record.save({ transaction: transactionHost });
    await record.reload({ transaction: transactionHost });

    return this.mapToDto(record);
  }

  async delete(id: string, transactionHost?: any): Promise<void> {
    try {
      const rowToRemove = await this.model.findByPk(id);
      await rowToRemove.update({'deleted': this.model.sequelize?.fn('to_timestamp', new Date().toLocaleString(), 'M/DD/YYYY, HH12:MI:SS AM, am, PM or pm')});
      await rowToRemove.save();
    } catch (error: any) {
      throw error;
    }
  }

  async get(id: string): Promise<DtoType> {
    const row = await this.model.findByPk<M>(id);
    return this.mapToDto(row);
  }

  async getAll(page: number = DEFAULT_RESULT_PAGE, size: number = DEFAULT_RESULT_SIZE, params: Record<string, any> = {}, orderBy?: Record<string, 'ASC' | 'DESC'>): Promise<(DtoType)[]> {
    const results: DtoType[] = [];
    try {
      let where = this.convertToWhere(params);
      where['limit'] = size;
      where['offset'] = page - 1;
      if (orderBy) {
        where['order'] = Object.entries(orderBy);
      }
      const rows: M[] = await this.model.findAll(where);
      rows.forEach((row: M) => {
        results.push(this.mapToDto(row));
      });
    } catch(e) {
      console.log(`getall failed: ${e}`);
    }
    finally { return results; };
  }
  deleteMany(conditions: { [key: string]: any; }, transactionHost?: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getCustom(paramsArray: Record<string, any>[]): Promise<DtoType> {
    const where = this.convertToWhere(paramsArray);
    const row = await this.model.findOne(where);

    return this.mapToDto(row);
  }
  getAllCustom<T>(page: number, size: number, params: Record<string, any>[], dtoConstructor: new (item: any) => T, orderBy?: Record<string, 'ASC' | 'DESC'>): Promise<any> {
    const result = new Promise(() => [])

    return result;
  }
  deleteCustom(params: Record<string, any>[], transactionHost?: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateMany(request: any, ids: Array<string>, transactionHost?: any): Promise<DtoType> {
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
  convertToWhere(params: Record<string, any> | Array<Record<string, any>>): FindOptions<M> {
    if (isArray(params)) {
      const joinedParams: Record<string, any> = {};
      params.forEach((param: any) => Object.entries(param).forEach(
        ([key, value]) => joinedParams[key] = value
      ));
      return { where: joinedParams };

    } else {
      return { where: params };
    }
  }

}
