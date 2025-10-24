import axios from 'axios';
import { getRequest, getSuccess, getFailed, getError, stuffAdded } from './feeSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllFees = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${BASE_URL}/FeeList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getStudentFees = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${BASE_URL}/StudentFees/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const addFee = (fields) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.post(`${BASE_URL}/FeeCreate`, fields, {
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

export const payFee = (id, fields) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.put(`${BASE_URL}/PayFee/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(getSuccess(result.data));
    } catch (error) {
        dispatch(getError(error));
    }
};

