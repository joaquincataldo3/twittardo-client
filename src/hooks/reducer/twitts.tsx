
import { Twitt } from "../../types"
import { twittsActions } from "../../utils/utils.ts"


interface TwittState {
    twitts: Twitt[]
    oneTwitt: Twitt
}

type Action =
    { type: string , payload: any } |
    { type: string, payload: any }

const reducer = (state: TwittState, action: Action): TwittState => {
    switch(action.type){
        case twittsActions.FETCH_TWITTS_SUCCESS:
            const twitts = action.payload
            return {...state, twitts}
        case twittsActions.FETCH_TWITTS_SUCCESS:
            const twitt = action.payload
            return {...state, oneTwitt: twitt}
        default: 
            throw new Error('Inesperado tipo de acción')
    }
}

export default reducer