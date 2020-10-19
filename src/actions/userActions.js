import * as actions from "./types";
import baseURI from "./baseURI";

export const loginUser = (dataToSubmit) => async () => {
    
    try {
        const { data } = await baseURI.post('/api/login', dataToSubmit);

        return {
            type: actions.LOGIN_USER,
            payload: data
        }
    } catch (e) {

        console.log(e);

    }

}

export const authUser = () => async () => {

    try {
        const { data } = await baseURI.get('/api/user');

        return {
            type: actions.AUTH_USER,
            payload: data
        }
    } catch (e) {

        console.log(e);

    }

}
