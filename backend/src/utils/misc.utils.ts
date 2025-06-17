import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { Request } from "express";
import { Op } from "sequelize";
import { DEFAULT_QUERY_SKIP } from "src/constants";
import { BaseController } from "src/mvc/base/base.controller";
import { UserAndProfileIdsDto } from "src/users/dto/user.dto";
import { v4 as guid } from "uuid";

export function getRandomUuid(): string {
  return guid();
}

export function convertQueryToRecord(url: any, params: Record<string | symbol, any>, fields: [] = []) {
  if (!url || url.length < 1) return params;

  const skipQ = DEFAULT_QUERY_SKIP;
  let queryOp = {};
  Object.entries(url).forEach(([key, value]) => {
    if (skipQ.includes(key)) return;
    switch (key) {
      case 'query':
        if (fields.length > 0) {
          fields.forEach((field: string) => {
            queryOp[field] = { [Op.iLike]: `%${value}%` };
          });
          params = { ...params, [Op.and]: { [Op.or]: queryOp } };
        } else {
          params[key] = value;
        }

        break;
      default:
        params[key] = value;
    }
  });

  return params;
}

export const extractUserFromRequest = (req: Request) => ((req?.user as UserAndProfileIdsDto))

export const extractAdditionalProperties = (obj1: Object, obj2: Object) => {
  const differences = {};

  // Check for properties in obj1 that don't exist in obj2
  for (const key in obj1) {
    if (!(key in obj2)) {
      differences[key] = obj1[key];
    }
  }
  // Check for properties in obj2 that don't exist in obj1
  for (const key in obj2) {
    if (!(key in obj1)) {
      differences[key] = obj2[key];
    }
  }

  return differences;
}

/**
 * 
 * @param requestBodyType
 * @param responseType
 * @param listResponseType
 * @returns 
 */
export function ApplyApiCreateDecorators<T, R>(entityType: Type<T>, responseType: Type<R>) {
  return applyDecorators(
    ApiBody({
      type: entityType,
      description: 'The create request'
    }),
    ApiCreatedResponse({
      type: responseType,
      description: 'Successfully created the object',
    })
  );
}
export function ApplyApiUpdateDecorators<T, R>(entityType: Type<T>, responseType: Type<R>) {
  return applyDecorators(
    ApiBody({
      type: entityType,
      description: 'The update request',
    }),
    ApiOkResponse({
      type: responseType,
      description: 'The updated response',
    })
  );
}
export function ApplyApiListDecorators<T>(entityType: Type<T>) {
  console.log(`APPLY LIST DECORATORS: ${entityType}`);
  return applyDecorators(
    ApiOkResponse({
      type: entityType,
      description: 'Collection of objects'
    })
  );
}
export function ApplyApiFoundDecorators<T>(entityType: Type<T>) {
  console.log(`APPLY LIST DECORATORS: ${entityType}`);
  return applyDecorators(
    ApiFoundResponse({
      type: entityType,
      description: 'Found object'
    }),
    ApiNotFoundResponse({
      type: entityType,
      description: 'Object not found'
    }),
  );
}

/**
 * class decorator
 * 
 * @param entityType 
 * @returns 
 */
export function ApplyCrudApiResponses<RequestBodyType, UpdateRequestBodyType, ResponseType, ListResponseType>(
  requestType: Type<RequestBodyType>,
  updateRequestType: Type<UpdateRequestBodyType>,
  responseType: Type<ResponseType>,
  listResponseType: Type<ListResponseType>
) {
  return (target: any) => {
    for (const key of Object.getOwnPropertyNames(BaseController.prototype)) {
      if (key === 'constructor') continue;

      const descriptor = Object.getOwnPropertyDescriptor(BaseController.prototype, key);
      if (descriptor && typeof descriptor.value === 'function') {
        console.log(key);
        switch (key) {
          case 'create':
            ApplyApiCreateDecorators<RequestBodyType, ResponseType>(requestType, responseType)(target.prototype, key, descriptor);
            break;
          case 'update':
            ApplyApiUpdateDecorators<UpdateRequestBodyType, ResponseType>(updateRequestType, responseType)(target.prototype, key, descriptor);
            break;
            case 'getAll':
            ApplyApiListDecorators<ListResponseType>(listResponseType)(target.prototype, key, descriptor);
            break;
            case 'get':
            ApplyApiFoundDecorators<ResponseType>(responseType)(target.prototype, key, descriptor);
            break;
        }
      }
    }
  };
}

export function isUserAdmin(userId: string): boolean {
  return true;
}