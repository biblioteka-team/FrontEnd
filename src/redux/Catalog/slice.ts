import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CatalogState, SetPagePayload, SetPageSizePayload, SetTotalPagesPayload } from './types'

const initialState: CatalogState = {
  pagination: {
    currentPage: 0,
    pageSize: 12,
    totalPages: 1
  }
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<SetPagePayload>) => {
      state.pagination.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<SetPageSizePayload>) => {
      state.pagination.pageSize = action.payload;
      state.pagination.currentPage = 0;
    },
    setTotalPages: (state, action: PayloadAction<SetTotalPagesPayload>) => {
      state.pagination.totalPages = action.payload;
    }
  }
});

export const { setPage, setPageSize, setTotalPages } = catalogSlice.actions;
export default catalogSlice.reducer;