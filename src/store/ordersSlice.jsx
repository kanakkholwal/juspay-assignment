import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrderApi, fetchOrdersApi } from '../api/orders';


export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await fetchOrdersApi();
    return response;
  }
);

export const addNewOrder = createAsyncThunk(
  'orders/addNewOrder',
  async (orderData) => {
    const response = await addOrderApi(orderData);
    return response;
  }
);


const initialState = {
  data: [],
  status: 'idle',
  addingStatus: 'idle', 
  error: null,
  // Table View State
  globalFilter: "",
  sorting: [],
  columnFilters: [],
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
    setColumnFilters: (state, action) => {
      state.columnFilters = action.payload;
      state.pagination.pageIndex = 0;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(addNewOrder.pending, (state) => {
        state.addingStatus = 'loading';
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.addingStatus = 'succeeded';
        state.data.unshift(action.payload);
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.addingStatus = 'failed';
      });
  },
});

export const { setGlobalFilter, setSorting, setColumnFilters, setPagination } = ordersSlice.actions;
export default ordersSlice.reducer;