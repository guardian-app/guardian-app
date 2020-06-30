import { User } from '../types';

export const userCreate = (user: User) => {
    return async (dispatch: Function) => {
        const response = await fetch(
            "http://localhost:3000/api/v1/users",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ ...user })
            }
        );

        console.error(response.ok, response.json);
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

const userAuthenticate = (user: User) => ({
    type: 'LOGIN_USER',
    payload: user
})