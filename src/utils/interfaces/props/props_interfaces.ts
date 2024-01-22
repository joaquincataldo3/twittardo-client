import { FormEvent, ReactNode } from "react"
import { Twitt } from "../entities/entities_interfaces"
import { MouseEvent } from "react"

export interface AppContextProp {
    children: ReactNode
}

export interface TwittCardProps {
    twitt: Twitt
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
    userId: string | null
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
    keepFetchingText: string
    noDataLeftText: string
}

export interface BlackScreenProps {
    state: boolean
}

export interface CloseMenuProps {
    colorVar: string
    functionToHandle: () => void
}

export interface CommentCardProps {
    commentEntity: Comment
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