import { API } from '../utils/config';
import axios from 'axios';

export const getDistrict = () => {
    return axios.get(`${API}/district`)
}

export const getProperties = () => {
    return axios.get(`${API}/property`)
}

export const getPropertyDetails = (id) => {
    return axios.get(`${API}/property/${id}`)
}

export const createProperty = (token, data) => {
    return axios.post(`${API}/property`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getFilteredProperties = (filters = {}) => {
    const data = {
        filters: { ...filters }
    }
    return axios.post(`${API}/property/filter`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
