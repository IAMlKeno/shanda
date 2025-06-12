import { Op } from "sequelize";
import { DEFAULT_QUERY_SKIP } from "src/constants";
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