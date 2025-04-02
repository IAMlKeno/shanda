export interface ListResponse<T> {
  count: number;
  totalCount: number;
  results: Array<T>;
}