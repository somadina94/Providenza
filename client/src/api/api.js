import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5003/api/v1/',
});

// const axiosInstance = axios.create({
//   baseURL: "https://api.provbm.com/api/v1/",
// });

export const createAccount = async (data) => {
    try {
        const res = await axiosInstance({
            method: 'POST',
            url: 'users/signUp',
            data,
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
            url: 'users/loginUser',
            data,
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const logOut = async () => {
    try {
        const res = await axiosInstance({
            method: 'POST',
            url: 'users/logout',
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const updatePassword = async (jwt, data) => {
    try {
        const res = await axiosInstance({
            method: 'PATCH',
            url: 'users/updatePassword',
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

export const forgotPassword = async (data) => {
    try {
        const res = await axiosInstance({
            method: 'POST',
            url: 'users/forgotPassword',
            data,
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const resetPassword = async (data, token) => {
    try {
        const res = await axiosInstance({
            method: 'POST',
            url: `users/resetPassword/${token}`,
            data,
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const getMe = async (jwt) => {
    try {
        const res = await axiosInstance({
            method: 'GET',
            url: `users/me`,
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const getOneUser = async (jwt, id) => {
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

export const uploadPhoto = async (jwt, data) => {
    try {
        const res = await axiosInstance({
            method: 'PUT',
            url: `users/uploadPhoto`,
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

export const sendToken = async (jwt) => {
    try {
        const res = await axiosInstance({
            method: 'PATCH',
            url: `transactions/sendToken`,
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
            url: `transactions`,
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

export const getTransaction = async (jwt) => {
    try {
        const res = await axiosInstance({
            method: 'GET',
            url: `transactions`,
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};
