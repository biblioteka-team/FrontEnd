import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store.js'



interface CatalogState {

  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

const initialState: CatalogState = {

  pagination: {
    currentPage: 0,
    pageSize: 12,
    totalPages: 1
  }
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
  
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload
      state.pagination.currentPage = 0
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.pagination.totalPages = action.payload
    }
  }
})

export const { 

  setPage, 
  setPageSize, 
  setTotalPages,
} = catalogSlice.actions

// Selectors
export const selectFilters = (state: RootState) => state.catalog.filters
export const selectPagination = (state: RootState) => state.catalog.pagination
export const selectAuthor = (state: RootState) => state.catalog.filters.author
export default catalogSlice.reducer