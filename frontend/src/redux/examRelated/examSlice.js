import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    examsList: [],
    loading: false,
    error: null,
    response: null,
};

const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.examsList = action.payload;
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
} = examSlice.actions;

export const examReducer = examSlice.reducer;

