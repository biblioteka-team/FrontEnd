import { RootState } from "../store.js"

export const selectPagination = (state: RootState) => state.catalog.pagination;