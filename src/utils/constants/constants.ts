
import { UserReducerActions, TwittReducerActions, FetchTwittActions } from "../interfaces/reducer/reducer_interfaces";

export const twittsActions: TwittReducerActions = {
    FETCH_TWITTS_SUCCESS: 'FETCH_TWITTS_SUCCESS',
    FETCH_ONETWITT_SUCCESS: 'FETCH_ONETWITT_SUCCESS',   
    SET_ONE_TWITT: 'SET_ONE_TWITT',
    EMPTY_CREATE_TW_ERROR: 'EMPTY_CREATE_TW_ERROR',
    MAX_CHARACTERS_TW_ERROR: 'MAX_CHARACTERS_TW_ERROR',
    CREATE_TW_ERROR: 'CREATE_TW_ERROR',
    CREATE_TWITT_SUCCESS: 'CREATE_TWITT_SUCCESS',
};

export const userActions: UserReducerActions = {
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    FETCH_ONEUSER_SUCCESS: 'FETCH_ONEUSER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
    GET_FOLLOWERS_NUMBER: 'GET_FOLLOWERS_NUMBER',
    LOGOUT_ERROR: 'LOGOUT_ERROR'
};

export const fetchTwittActions: FetchTwittActions = {
    INITIAL: 'INITIAL',
    REGULAR: 'REGULAR',
    RELOAD: 'RELOAD'
};

export const userEmptyState =  {
    _id: '',
    username: '',
    email: '',
    image_url: '',
    avatar: '',
    isAdmin: null,
    followers: [],
    following: [],
    followersNumber: 0,
    followingNumber: 0,
    favourites: [],
    twitts: [],
    comments: []
}
