
import { Twitt } from "../../types"


interface TwittState {
    twitts: Twitt[]
    oneTwitt: Twitt
}

type Action =
    { type: 'FETCH_TWITTS_SUCCESS', payload: any } |
    { type: 'FETCH_ONETWITT_SUCCESS', payload: any }

const reducer = (state: TwittState, action: Action): TwittState => {
    switch(action.type){
        case 'FETCH_TWITTS_SUCCESS':
            const twitts = action.payload
            return {...state, twitts}
        case 'FETCH_ONETWITT_SUCCESS':
            const twitt = action.payload
            return {...state, oneTwitt: twitt}
        default: 
            throw new Error('Inesperado tipo de acción')
    }
}

export default reducer