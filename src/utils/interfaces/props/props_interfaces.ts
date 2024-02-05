import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react"
import { Comment, Twitt, User } from "../entities/entities_interfaces"
import { MouseEvent } from "react"

export interface AppContextProp {
    children: ReactNode
}

export interface TwittCardProps {
    twitt: Twitt
    length?: number
    index?: number
}

export interface NoContentTextProps {
    msg: string
}

export interface AvatarContainerProps {
    url: string
    width: number
    height: number
    userId?: string | null
    handleFunction?: (userId: string) => void
}

export interface BtnSharedProps {

    additionalClassName?: string[]
    widthNum: number
}

export interface CreateTwittBtnProps extends BtnSharedProps {
    content: string
    handleClick: (e: FormEvent) => void
    twittId?: string
}


export interface FetchActionBtnProps extends BtnSharedProps {
    handleClick: (e: MouseEvent) => void
    state: boolean
}

export interface BlackScreenProps {
    state: boolean
}

export interface CloseMenuProps {
    colorVar: string
    functionToHandle: () => void
}

export interface CommentCardProps {
    comment: Comment
    length?: number
    index?: number
}


export interface TwittTextareaProps {
    name: string
}

export interface CreateCommentProps {
    twittId: string
}

export interface ConfirmDeleteTwittProps {
    twittId: string
}

export interface FetchTwittsBtnProps {
    content: string
    noTwittsLeft: boolean
    handleBtnClick: () => {}
}

export interface NoContentTextProps {
    msg: string
}

export interface ProfileTwittBoxProps {
    entity: Twitt[] | Comment[]
    activeContainer: number
    containerIndex: number
    userId: string
}

export interface ProfileUserCardProps {
    user: User
    userProfile: User
}