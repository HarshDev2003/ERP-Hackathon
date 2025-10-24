import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffAdded
} from './admissionSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllAdmissions = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/AdmissionList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getAdmissionDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/Admission/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const addAdmission = (fields) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.post(`${BASE_URL}/AdmissionCreate`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffAdded());
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const updateAdmission = (id, fields) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${BASE_URL}/Admission/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(getSuccess(result.data));
    } catch (error) {
        dispatch(getError(error));
    }
};

