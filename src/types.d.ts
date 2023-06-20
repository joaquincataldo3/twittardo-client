import { ReactNode } from "react";


type Followers = string[] | []
type Following = string[] | []

export interface User {
    username: string,
    email: string
    avatar?: string,
    followers: Followers,
    following: Following,
    followersNumber: number,
    followingNumber: number
}

export interface Twitt {
    twitt: string,
    user: string,
    image?: string
}

export interface Error {
    message: string;
}


export interface AppContextProp {
    children: ReactNode
}

export interface TwittState {
    twitts: {
        data: Twitt[]
    } ,
    oneTwitt: Twitt
}


export interface UserCtxt {
    users: User[],
    user: User,
    error?: string,
    token: string
    login: (username: string, password: string) => void,
    isMobileNavbarOpen: boolean,
    toggleNavbar: () => void
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



