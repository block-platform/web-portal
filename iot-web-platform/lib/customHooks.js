import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from './common';
import { APP_ROUTES } from '../utils/constants';
import Router from 'next/router';

export function useUser() {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function getUserDetails() {
            const { authenticated, user, token } = await getAuthenticatedUser();
            if (!authenticated) {
                Router.push(APP_ROUTES.SIGN_IN);
                return;
            }
            setUser(user);
            setAuthenticated(authenticated);
            setToken(token);
        }
        getUserDetails();
    }, []);
    console.log(`Returning user : ${JSON.stringify(user)} and authenticated: ${authenticated} from customHooks with token: ${token}`);
    return { user, authenticated, token };
}
