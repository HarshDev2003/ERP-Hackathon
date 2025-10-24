import axios from 'axios';
import { getRequest, getSuccess, getFailed, getError, stuffAdded } from './hostelSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllHostels = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${BASE_URL}/HostelList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getHostelDetails = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${BASE_URL}/Hostel/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const addHostel = (fields) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.post(`${BASE_URL}/HostelCreate`, fields, {
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

export const allocateRoom = (id, fields) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.put(`${BASE_URL}/AllocateRoom/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(getSuccess(result.data));
    } catch (error) {
        dispatch(getError(error));
    }
};

