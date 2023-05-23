import { ReactNode } from "react";


export interface User {
    username: string,
    password: string,
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
    twitts: Twitt[] | [],
    oneTwitt: Twitt
}




