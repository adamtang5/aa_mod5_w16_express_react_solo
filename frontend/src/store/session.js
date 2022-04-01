import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUSer';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = user => ({
    type: SET_USER,
    payload: user,
});

const removeUser = () => ({
    type: REMOVE_USER,
})

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
};

const initialState = {
    user: null,
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            const newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER: {
            const newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }
        default:
            return state;
    }
};

export default sessionReducer;