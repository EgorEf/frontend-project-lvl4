import axios from 'axios';

import { getToken } from 'utils';

const API_ROUTES = {
    login: '/api/v1/login',
    data: '/api/v1/data',
    signup: '/api/v1/signup'
};

const API = {
    getData: async () => {
        const response = await axios.get(API_ROUTES.data, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return response.data;
    },
    login: async (username, password) => {
        const response = await axios.post(API_ROUTES.login, {
            username,
            password
        });

        return response.data;
    },
    signup: async (username, password) => {
        const response = await axios.post(API_ROUTES.signup, {
            username,
            password
        });

        return response.data;
    }
};

export default API;
