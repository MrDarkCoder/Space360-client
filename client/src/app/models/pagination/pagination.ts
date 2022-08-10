export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  results: T; // i.e., list of space, team, reservation
  pagination: Pagination;
}
