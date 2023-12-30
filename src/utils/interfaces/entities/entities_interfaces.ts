import { Params } from "react-router-dom"

export interface User {
    _id: string | null,
    username: string,
    email: string
    avatar: string,
    image_url: string,
    isAdmin: number | null,
    followers: string[] | string,
    following: string[] | string,
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

export interface Twitt {
    _id: string,
    twitt: string,
    user: User,
    image?: string,
    image_url?: string,
    comments: Comment[]
    commentsNumber: number
    favourites: number
}

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


export interface Comment {
    _id: string
    comment: string
    favourites: number
    user: User
}


