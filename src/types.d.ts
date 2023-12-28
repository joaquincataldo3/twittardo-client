import { ReactNode } from "react";
import {Dispatch, SetStateAction} from 'react';
import { Params } from "react-router-dom";


type Followers = string[] | []
type Following = string[] | []


// global

export interface AppContextProp {
    children: ReactNode
}

// users

export interface User {
    _id: string | null,
    username: string,
    email: string
    avatar: string,
    image_url: string,
    isAdmin: number | null,
    followers: Followers,
    following: Following,
    followersNumber: number,
    followingNumber: number,
    favourites: string[]
    twitts: Twitt[],
    comments: Comment[]
}

export interface UserCtxt {
    users: User[]
    user: User
    userProfile: User
    error?: string
    token: string
    login: (username: string, password: string) => void
    isMobileNavbarOpen: boolean
    toggleNavbar: () => void,
    checkLogin: () => void
    handleLogout: () => void
    getUser: (id: string | Readonly<Params<string>>) => void

}

export interface UserInitState {
    users: User[],
    user: User,
    userProfile: User,
    error: string
    token: string
}

export interface FormLoginData {
    email: string
    password: string
}

// twitts

export interface TwittInitState {
    twitts: {
        data: Twitt[]
    } ,
    oneTwitt: Twitt,
    page: number,
    twittError: string,
    isTwittErrorActive: boolean
}

export interface TwittCxt extends TwittInitState  {
    twitts: {
        data: Twitt[]
    },
    characters: number
    oneTwitt: Twitt
    page: number
    twittError: string
    twittTextareaContent: string
    isLoading: boolean
    isTwittErrorActive: boolean,
    noTwittsLeft: boolean
    isFavLoading: boolean
    isTwittTextareaEmpty: boolean
    fetchTwitts: (method: string) => void
    fetchOneTwitt: (id: string) => void
    createComment: (commentContent: string, twittId: string) => void
    createTwittError: (msg: string) => void
    createTwitt: (formData: FormData) => void
    favTwitt: (twittId: string, userId: string) => void
    undoFav: (twittId: string, userId: string) => void
    handleCharacters: (method: string) => void
    handleTextareaChange: (value: React.ChangeEvent<HTMLTextAreaElement> | string) => void
    handleTextareaIsEmpty: (value: boolean) => void
}

export interface FetchTwittActions {
    INITIAL: string
    REGULAR: string
    RELOAD: string
}

export interface Twitt {
    _id: string,
    twitt: string,
    user: User,
    image?: string,
    image_url?: string,
    comments?: Comment[]
    commentsNumber: number
    favourites: number
}

export interface TwittTextareaProps {
    name: string
}

// comment

export interface CreateCommentProps {
    twittId: string
}

export interface Comment {
    _id: string
    comment: string
    favourites: number
    user: User
}

export interface CommentCardProps {
    commentEntity: Comment
}


// reducer
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

// types

type HandleCreateTwitt = (e: React.FormEvent) => void 


// props
export interface TwittCardProps {
    twitt: Twitt,
}

export interface CommentCardProps {
    comment: Comment
}

export interface CommentProps {
    comment: Comment
}

export interface NoContentTextProps {
    msg: string
}

export interface AvatarContainerProps {
    url: string
    width: number
    height: number
    handleFunction?: () => void
}

export interface CreateTwittBtnProps {
    content: string
    handleClick: HandleCreateTwitt
    twittId?: string
}

export interface BlackScreenProps {
    state: boolean
}

export interface CloseMenuProps {
    colorVar: string
    functionToHandle: () => void
}

// error
export interface LoginError {
    msg: string
}

export interface Error {
    message: string;
}

