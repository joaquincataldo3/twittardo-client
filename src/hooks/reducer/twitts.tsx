
import { TwittState } from "../../types"
import { twittsActions } from "../../utils/utils.ts"

type Action ={ type: string , payload: any } 

const reducer = (state: TwittState, action: Action): TwittState => {
    switch(action.type){
        case twittsActions.FETCH_TWITTS_SUCCESS:
            const twittPayload = action.payload
            return {...state, twitts: {...state.twitts, data: twittPayload}}
        default: 
            throw new Error('Inesperado tipo de acción')
    }
}

export default reducer