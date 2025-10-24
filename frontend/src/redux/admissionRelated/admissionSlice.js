import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admissionsList: [],
    loading: false,
    error: null,
    response: null,
};

const admissionSlice = createSlice({
    name: 'admission',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.admissionsList = action.payload;
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
} = admissionSlice.actions;

export const admissionReducer = admissionSlice.reducer;

