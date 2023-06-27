import { CHANGE_INITIAL_ROUTE, REGISTER, LOGIN, LOGOUT, PROFILE_UPDATED } from "./app.types";

const INITIAL_STATE = {
    initialRoute: 'webscreen',//'login',
    token: null,
    user: null,
}
const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case PROFILE_UPDATED:
            return {
                ...state,
                user: action.payload
            }

        case CHANGE_INITIAL_ROUTE:
            return {
                ...state,
                initialRoute: action.payload
            }

        case REGISTER:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }

        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }

        case LOGOUT:
            return {
                ...state,
                token: null,
                user: null
            }

        default:
            return state;
    }
}

export default appReducer;