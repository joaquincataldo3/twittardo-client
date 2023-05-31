import { ReactNode } from "react";


export interface User {
    username: string,
    email: string
    avatar?: string,
    followers: string[] | []
    followersNumber: number | null
}

export interface Twitt {
    twitt: string,
    user: string
}

export interface Error {
    message: string;
}


export interface AppContextProp {
    children: ReactNode
}

export interface TwittState {
    twitts: Twitt[] ,
    oneTwitt: Twitt
}


export interface UserCtxt {
    users: User[],
    user: User,
    error?: string,
    token: string
    login: (username: string, password: string) => void
}


export interface UserInitState {
    users: User[],
    user: User,
    error: string
    token: string
}

export interface reducerActions {
    FETCH_USERS_SUCCESS: string,
    FETCH_ONEUSER_SUCCESS: string,
    USER_LOGIN_SUCCESS: string,
    USER_LOGIN_ERROR: string,
    GET_FOLLOWERS_NUMBER: string
}

export interface FormLoginData {
    email: string
    password: string
}



