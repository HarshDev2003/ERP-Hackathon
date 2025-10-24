import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hostelsList: [],
    loading: false,
    error: null,
    response: null,
};

const hostelSlice = createSlice({
    name: 'hostel',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.hostelsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        stuffAdded: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffAdded
} = hostelSlice.actions;

export const hostelReducer = hostelSlice.reducer;

