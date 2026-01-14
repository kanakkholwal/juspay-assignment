import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSidebarData } from '../api/sidebar';

// Async Thunk to fetch data
export const getSidebarData = createAsyncThunk(
    'sidebar/fetchData',
    async () => {
        const response = await fetchSidebarData();
        return response;
    }
);

const initialState = {
    notifications: [],
    activities: [],
    contacts: [],
    status: 'idle',
    error: null,
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSidebarData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSidebarData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notifications = action.payload.notifications;
                state.activities = action.payload.activities;
                state.contacts = action.payload.contacts;
            })
            .addCase(getSidebarData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default sidebarSlice.reducer;