import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    leftPanelOpen: true,
    rightPanelOpen: true,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLeftPanelOpen: (state, action) => {
            state.leftPanelOpen = action.payload;
        },
        toggleLeftPanel: (state) => {
            state.leftPanelOpen = !state.leftPanelOpen;
        },
        setRightPanelOpen: (state, action) => {
            state.rightPanelOpen = action.payload;
        },
        toggleRightPanel: (state) => {
            state.rightPanelOpen = !state.rightPanelOpen;
        },
    },
});

export const {
    setLeftPanelOpen,
    toggleLeftPanel,
    setRightPanelOpen,
    toggleRightPanel
} = layoutSlice.actions;

export default layoutSlice.reducer;