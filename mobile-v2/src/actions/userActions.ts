import * as SecureStore from 'expo-secure-store';
import { User } from '../types';

export const userCreate = (user: User) => {
    return async (dispatch: Function) => {
        dispatch(userCreate_Ready());

        const request = fetch(
            `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users/create`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', },
                body: JSON.stringify({ ...user })
            }
        );

        try {
            const response = await request;
            if (response.ok) {
                dispatch(userCreate_Success("We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link."));
            } else {
                dispatch(userCreate_Failure(await response.text()));
            };
        } catch (err) {
            console.warn(err);
            userCreate_Failure("Unexpected error occured!");
        };
    };
};

export const userAuthenticate = (user: User) => {
    return async (dispatch: Function) => {
        dispatch(userAuthenticate_Ready());

        const request = fetch(
            `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users/authenticate`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ ...user })
            }
        );

        try {
            const response = await request;
            if (response.ok) {
                const { token, user } = await response.json();
                await SecureStore.setItemAsync("token", token);
                await SecureStore.setItemAsync("user", JSON.stringify(user));

                dispatch(userAuthenticate_Success(user, token));
            } else {
                dispatch(userAuthenticate_Failure(await response.text()));
            };
        } catch (err) {
            console.warn(err);
            userAuthenticate_Failure("Unexpected error occured!");
        };
    };
};

export const userResetPasswordRequest = (emailAddress: string) => {
    return async (dispatch: Function) => {
        dispatch(userResetPasswordRequest_Ready());

        const request = fetch(
            `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users/reset`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', },
                body: JSON.stringify({ email_address: emailAddress })
            }
        );

        try {
            const response = await request;
            if (response.ok) {
                dispatch(userResetPasswordRequest_Success("We have sent an email with a reset code to your email address."));
            } else {
                dispatch(userResetPasswordRequest_Failure(await response.text()));
            };
        } catch (err) {
            console.warn(err);
            userResetPasswordRequest_Failure("Unexpected error occured!");
        };
    };
};

export const userResetPassword = (emailAddress: string, resetCode: string, password: string) => {
    return async (dispatch: Function) => {
        dispatch(userResetPassword_Ready());

        const request = fetch(
            `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users/reset`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', },
                body: JSON.stringify({ email_address: emailAddress, reset_key: resetCode, password: password })
            }
        );

        try {
            const response = await request;
            if (response.ok) {
                dispatch(userResetPassword_Success("Successully reset the password!"));
            } else {
                dispatch(userResetPassword_Failure(await response.text()));
            };
        } catch (err) {
            console.warn(err);
            userResetPassword_Failure("Unexpected error occured!");
        };
    };
};

export const userValidateToken = () => {
    return async (dispatch: Function) => {
        dispatch(userAuthenticate_Ready());

        try {
            const token = await SecureStore.getItemAsync("token");
            if (token === null) return dispatch(userAuthenticate_Failure(''));

            const request = fetch(
                `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users/me`,
                {
                    method: "GET",
                    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
                }
            );

            const response = await request;
            if (response.ok) {
                const user: User = await response.json();
                dispatch(userAuthenticate_Success(user, token));
            } else {
                dispatch(userAuthenticate_Failure(await response.text()));
            };
        } catch (err) {
            console.warn(err);
            userAuthenticate_Failure("Unexpected error occured!");
        } finally {
            dispatch(userValidateToken_Complete());
        };
    };
};

export const userLogout = () => {
    return async (dispatch: Function) => {
        await SecureStore.deleteItemAsync("user");
        await SecureStore.deleteItemAsync("token");

        dispatch(userLogout_Complete());
    };
};

const userAuthenticate_Ready = () => ({
    type: 'USER_AUTHENTICATE_READY'
});

const userAuthenticate_Success = (user: User, token: string) => ({
    type: 'USER_AUTHENTICATE_SUCCESS',
    user: user,
    token: token
});

const userAuthenticate_Failure = (message: string) => ({
    type: 'USER_AUTHENTICATE_FAILURE',
    error: message
});

const userCreate_Ready = () => ({
    type: 'USER_CREATE_READY'
});

const userCreate_Success = (message: string) => ({
    type: 'USER_CREATE_SUCCESS',
    message: message
});

const userCreate_Failure = (message: string) => ({
    type: 'USER_CREATE_FAILURE',
    error: message
});

const userResetPasswordRequest_Ready = () => ({
    type: 'USER_RESET_PASSWORD_REQUEST_READY'
});

const userResetPasswordRequest_Success = (message: string) => ({
    type: 'USER_RESET_PASSWORD_REQUEST_SUCCESS',
    message: message
});

const userResetPasswordRequest_Failure = (message: string) => ({
    type: 'USER_RESET_PASSWORD_REQUEST_FAILURE',
    error: message
});

const userResetPassword_Ready = () => ({
    type: 'USER_RESET_PASSWORD_READY'
});

const userResetPassword_Success = (message: string) => ({
    type: 'USER_RESET_PASSWORD_SUCCESS',
    message: message
});

const userResetPassword_Failure = (message: string) => ({
    type: 'USER_RESET_PASSWORD_FAILURE',
    error: message
});

const userValidateToken_Complete = () => ({
    type: 'USER_VALIDATE_TOKEN_COMPLETE'
});

const userLogout_Complete = () => ({
    type: 'USER_LOGOUT_COMPLETE'
});