import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://127.0.0.1:5003/api/v1/',
// });

const axiosInstance = axios.create({
    baseURL: 'https://api.provbm.com/api/v1/',
});

export const createAccount = async (jwt, data) => {
    try {
        const res = await axiosInstance({
            method: 'POST',
            url: 'users/signUp',
            data,
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const logIn = async (data) => {
    try {
        const res = await axiosInstance({
            method: 'POST',
            url: 'users/loginAdmin',
            data,
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const getAllAccounts = async (jwt) => {
    try {
        const res = await axiosInstance({
            method: 'GET',
            url: 'users',
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const getOneAccount = async (jwt, id) => {
    try {
        const res = await axiosInstance({
            method: 'GET',
            url: `users/${id}`,
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const updateAccount = async (jwt, data, id) => {
    try {
        const res = await axiosInstance({
            method: 'PATCH',
            url: `users/${id}`,
            data,
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const getTransactions = async (jwt) => {
    try {
        const res = await axiosInstance({
            method: 'GET',
            url: `transactions/getTransactions`,
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const deleteTransaction = async (jwt, id) => {
    try {
        const res = await axiosInstance({
            method: 'DELETE',
            url: `transactions/${id}`,
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const createTransaction = async (jwt, data) => {
    try {
        const res = await axiosInstance({
            method: 'POST',
            url: `transactions/create`,
            data,
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};
