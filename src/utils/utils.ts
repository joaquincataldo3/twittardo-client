import { reducerActions } from "../types"

export const twittsActions = {
    FETCH_TWITTS_SUCCESS: 'FETCH_TWITTS_SUCCESS',
    FETCH_ONETWITT_SUCCESS: 'FETCH_ONETWITT_SUCCESS',   
}

export const userActions: reducerActions = {
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    FETCH_ONEUSER_SUCCESS: 'FETCH_ONEUSER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
    GET_FOLLOWERS_NUMBER: 'GET_FOLLOWERS_NUMBER'
}

export const apiUrl = 'https://drab-ruby-termite-tie.cyclic.app/'