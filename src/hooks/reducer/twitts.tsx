
import { TwittInitState, Twitt } from "../../types"
import { twittsActions, fetchTwittActions } from "../../utils/constants/constants.ts"

type Action = { type: string, payload: any }

const reducer = (state: TwittInitState, action: Action): TwittInitState => {
    switch (action.type) {
        case twittsActions.FETCH_TWITTS_SUCCESS:
            const {data, method} = action.payload;
            let page: number;
            let updatedTwitts: Twitt[];
            if(method === fetchTwittActions.RELOAD || method === fetchTwittActions.REGULAR){
                updatedTwitts = [...state.twitts.data, ...data];
                page = state.page + 1;
            } else {
                page = 1;
                updatedTwitts = data;
            }     
            return { ...state, page, twitts: { ...state.twitts, data: updatedTwitts } }
        case twittsActions.FETCH_ONETWITT_SUCCESS:
            const twittPayload = action.payload;
            return { ...state, oneTwitt: twittPayload }
        case twittsActions.SET_ONE_TWITT:
            const id = action.payload.id ;
            const twitts = action.payload.twitts;
            const oneTwitt = twitts.find((tw: Twitt) => tw._id == id)
            return {...state, oneTwitt}
        case twittsActions.CREATE_TW_ERROR:
            const msg = action.payload.msg;
            return {...state, isTwittErrorActive: true, twittError: msg}
        default:
            throw new Error('Inesperado tipo de acción')
    }
}

export default reducer