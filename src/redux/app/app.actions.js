import { CHANGE_INITIAL_ROUTE, REGISTER, LOGIN, LOGOUT, PROFILE_UPDATED } from "./app.types";

export const changeInitialRoute = route => ({
    type: CHANGE_INITIAL_ROUTE,
    payload: route,
})

export const registerUser = (token, user) => ({
    type: REGISTER,
    payload: { token, user}
})

export const loginUser = (token, user) => ({
    type: LOGIN, 
    payload: { token, user }
})

export const logoutUser = () => ({
    type: LOGOUT,
    payload: null
})

export const updateProfile = (user) => ({
    type: PROFILE_UPDATED,
    payload: user
});
