import { ReactNode } from "react";


type Followers = string[] | []
type Following = string[] | []

export interface User {
    _id: string | null,
    username: string,
    email: string
    avatar?: string,
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
}

export interface TwittState {
    twitts: {
        data: Twitt[]
    } ,
    oneTwitt: Twitt,
    fetchTwitts: () => void,
    fetchOneTwitt: (id: string) => void,
    page: number,
    isLoading: boolean,
    isOneTwittActive: boolean,
    /* setOneTwitt: (id: string) => void, */
    setIsOneTwittActive: (prevState)=> void,
  /*   disableOneTwitt: () => void */
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

export interface TwittCardProps {
    twitt: Twitt,
}

export interface CommentProps {
    comment: Comment
}
