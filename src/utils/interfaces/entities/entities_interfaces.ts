import { Params } from "react-router-dom"

export type Image = {
    secure_url: string
    public_id: string
}

export interface User {
    _id: string | null
    username: string
    email: string
   image: Image,
    isAdmin: number | null
    followers: string[] | string
    following: string[] | string
    followersNumber: number
    followingNumber: number
    favourites: Twitt[]
    twitts: Twitt[]
    comments: Comment[]
}

export interface UserCtxt {
    users: User[]
    user: User
    userProfile: User
    token: string
    formError: string
    isMobileNavbarOpen: boolean
    userTwittsPage: number
    noMoreTwitts: boolean
    login: (username: string, password: string) => void
    toggleNavbar: () => void,
    checkLogin: () => void
    handleLogout: () => void
    getUser: (id: string | Readonly<Params<string>>) => void
    redirectUserProfile: (userId: string) => void
    registerUser: (formData: FormData) => void
    getMoreTwittsByUser: (userId: string) => void
}

export interface UserInitState {
    users: User[]
    user: User
    userProfile: User
    error: string
    token: string
    formError: string
    userTwittsPage: number
}



export interface Twitt {
    _id: string
    twitt: string
    user: User
    image?: Image
    comments: Comment[]
    commentsNumber: number
    favourites: number
}

export interface TwittInitState {
    twitts: {
        data: Twitt[]
    }
    oneTwitt: Twitt
    page: number
    twittError: string
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
    noTwittsLeft: boolean
    isFavLoading: boolean
    isTwittTextareaEmpty: boolean

    fetchTwitts: (method: string) => void
    fetchOneTwitt: (id: string) => void
    createComment: (commentContent: string, twittId: string) => void
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
    twittCommented: Twitt
}


