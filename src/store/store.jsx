import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import layoutReducer from './layoutSlice';
import ordersReducer from './ordersSlice';
import sidebarReducer from './sidebarSlice';

export const store = configureStore({
    reducer: {
        orders: ordersReducer,
        layout: layoutReducer,
        sidebar: sidebarReducer,
        dashboard: dashboardReducer,
    },
});