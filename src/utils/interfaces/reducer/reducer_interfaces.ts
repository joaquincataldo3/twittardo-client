export interface UserReducerActions {
    FETCH_USERS_SUCCESS: string,
    FETCH_ONEUSER_SUCCESS: string,
    USER_LOGIN_SUCCESS: string,
    USER_LOGIN_ERROR: string,
    GET_FOLLOWERS_NUMBER: string,
    LOGOUT_ERROR: string
}

export interface TwittReducerActions {
    FETCH_TWITTS_SUCCESS: string,
    FETCH_ONETWITT_SUCCESS: string,   
    SET_ONE_TWITT: string,
    EMPTY_CREATE_TW_ERROR: string,
    MAX_CHARACTERS_TW_ERROR: string,
    CREATE_TW_ERROR: string,
    CREATE_TWITT_SUCCESS: string
}

export interface FetchTwittActions {
    INITIAL: string,
    REGULAR: string,
    RELOAD: string
}