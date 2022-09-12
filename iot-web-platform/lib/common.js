import { API_ROUTES } from '../utils/constants';
import axios from 'axios';

export function storeTokenInLocalStorage(token) {
    localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

export async function getAuthenticatedUser() {
    const defaultReturnObject = { authenticated: false, user: null };

    try {
        const token = getTokenFromLocalStorage();
        if (!token) {
            return defaultReturnObject;
        }

        const response = await axios({
            method: 'POST',
            url: API_ROUTES.GET_USER,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (authenticated === true) {
            return { authenticated: true, user: response.data.user, token: token };
        } else {
            return { authenticated: false, user: null, token: null };
        }
    } catch (err) {
        console.log('getAuthenticatedUser, Something Went Wrong', err);
        return defaultReturnObject;
    }
}
