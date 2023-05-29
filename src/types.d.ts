import { ReactNode } from "react";


export interface User {
    username: string,
    email: string
    avatar?: string
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



export interface FormLoginData {
    email: string
    password: string
}



