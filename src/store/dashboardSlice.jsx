import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDashboardData } from '../api/dashboard';

export const getDashboardData = createAsyncThunk(
    'dashboard/fetchData',
    async () => {
        const response = await fetchDashboardData();
        return response;
    }
);

const initialState = {
    data: null,
    status: 'idle',
    error: null,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dashboardSlice.reducer;