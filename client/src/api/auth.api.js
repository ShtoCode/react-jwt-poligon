import axios from 'axios';

export const userRequest = async (user) => {
    return await axios.post('http://localhost:5000/auth/login', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const userUpdateRequest = async (token) => {
    return await axios.post('http://localhost:5000/auth/refresh', { token }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const createUserRequest = async (user) => {
    return await axios.post('http://localhost:5000/auth/register', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
