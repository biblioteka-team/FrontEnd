export interface CatalogState {
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

export type SetPagePayload = number;
export type SetPageSizePayload = number;
export type SetTotalPagesPayload = number;