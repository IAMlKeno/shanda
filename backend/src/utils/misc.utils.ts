import { Request } from "express";
import { Op } from "sequelize";
import { DEFAULT_QUERY_SKIP } from "src/constants";
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
    switch(key) {
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

export const extractUserFromRequest = (req: Request) => ( (req?.user as UserAndProfileIdsDto) )

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
