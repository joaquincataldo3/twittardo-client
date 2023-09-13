import { ReactNode } from "react";
import {Dispatch, SetStateAction} from 'react';


type Followers = string[] | []
type Following = string[] | []

export interface User {
    _id: string | null,
    username: string,
    email: string
    avatar?: string,
    image_url?: string,
    isAdmin: number | null,
    followers: Followers,
    following: Following,
    followersNumber: number,
    followingNumber: number,
    favourites: string[]
}

export interface Twitt {
    _id: string,
    twitt: string,
    user: User,
    image?: string,
    image_url?: string,
    comments?: Comment[],
    commentsNumber: number,
    favourites: number
}

export interface Comment {
    _id: string,
    comment: string,
    user: User,
}

export interface Error {
    message: string;
}


export interface AppContextProp {
    children: ReactNode
}

export interface TwittInitState {
    twitts: {
        data: Twitt[]
    } ,
    oneTwitt: Twitt,
    page: number,
    twittError: string,
    isTwittErrorActive: boolean,
}

export interface TwittCxt extends TwittInitState  {
    twitts: {
        data: Twitt[]
    } ,
    oneTwitt: Twitt,
    fetchTwitts: (method: string) => void,
    fetchOneTwitt: (id: string) => void,
    page: number,
    isLoading: boolean,
    twittError: string,
    isTwittErrorActive: boolean,
    createTwitt: (formData: FormData) => void,
    createTwittError: (msg: string) => void
}


export interface UserCtxt {
    users: User[],
    user: User,
    error?: string,
    token: string
    login: (username: string, password: string) => void,
    isMobileNavbarOpen: boolean,
    toggleNavbar: () => void,
    checkLogin: () => void
}


export interface UserInitState {
    users: User[],
    user: User,
    error: string
    token: string
}

export interface UserReducerActions {
    FETCH_USERS_SUCCESS: string,
    FETCH_ONEUSER_SUCCESS: string,
    USER_LOGIN_SUCCESS: string,
    USER_LOGIN_ERROR: string,
    GET_FOLLOWERS_NUMBER: string
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

export interface FormLoginData {
    email: string
    password: string
}

export interface TwittCardProps {
    twitt: Twitt,
}

export interface CommentProps {
    comment: Comment
}

export interface LoginError {
    msg: string
}
