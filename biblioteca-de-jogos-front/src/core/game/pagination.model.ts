export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export const initialPagination: Pagination = {
  page: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 0,
};
