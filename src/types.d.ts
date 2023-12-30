import { ReactNode } from "react";
import {Dispatch, SetStateAction} from 'react';
import { Params } from "react-router-dom";


type Followers = string[] | []
type Following = string[] | []

type HandleCreateTwitt = (e: React.FormEvent) => void 


// error
export interface LoginError {
    msg: string
}

export interface Error {
    message: string;
}

