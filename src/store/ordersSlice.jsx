import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    globalFilter: "",
    sorting: [],
    pagination: {
        pageIndex: 0,
        pageSize: 8,
    },
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setGlobalFilter: (state, action) => {
            state.globalFilter = action.payload;
            state.pagination.pageIndex = 0;
        },
        setSorting: (state, action) => {
            state.sorting = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        resetOrdersState: (state) => {
            return initialState;
        }
    },
});

export const { setGlobalFilter, setSorting, setPagination, resetOrdersState } = ordersSlice.actions;
export default ordersSlice.reducer;