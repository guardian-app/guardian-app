import * as SecureStore from 'expo-secure-store';
import { User } from '../types';

export const userCreate = (user: User) => {
    return async (dispatch: Function) => {
        const request = fetch(
            `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users/create`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ ...user })
            }
        );

        try {
            const response = await request;
            if (response.ok) {
                dispatch(userCreate_Success("We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link."));
            } else {
                dispatch(userCreate_Failure(await response.json()));
            };
        } catch (err) {
            console.warn(err);
            userCreate_Failure("Unexpected error occured!");
        };

    }
}

export const userAuthenticate = (user: User) => {
    return async (dispatch: Function) => {
        const request = fetch(
            `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users/authenticate`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ ...user })
            }
        );

        try {
            const response = await request;

            if (response.ok) {
                const { token, user } = await response.json();
                await SecureStore.setItemAsync("token", token);
                dispatch(userAuthenticate_Success(user));
            } else {
                dispatch(userAuthenticate_Failure(await response.text()));
            };
        } catch (err) {
            console.warn(err);
            userAuthenticate_Failure("Unexpected error occured!");
        };

        // return fetch("http://localhost:3000/api/v1/users", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json',
        //     },
        //     body: JSON.stringify({ user })
        // })
        //     .then(resp => resp.json())
        //     .then(data => {
        //         if (data.message) {
        //             // Here you should have logic to handle invalid creation of a user.
        //             // This assumes your Rails API will return a JSON object with a key of
        //             // 'message' if there is an error with creating the user, i.e. invalid username
        //         } else {
        //             localStorage.setItem("token", data.token)
        //             dispatch(userAuthenticate(data.user))
        //         }
        //     })
    }
}

const userAuthenticate_Success = (user: User) => ({
    type: 'USER_AUTHENTICATE_SUCCESS',
    payload: user
});

const userAuthenticate_Failure = (message: string) => ({
    type: 'USER_AUTHENTICATE_FAILURE',
    error: message
});

const userCreate_Success = (message: string) => ({
    type: 'USER_CREATE_SUCCESS',
    message: message
});

const userCreate_Failure = (message: string) => ({
    type: 'USER_CREATE_FAILURE',
    error: message
});