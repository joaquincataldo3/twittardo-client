
import { TwittInitState } from "../../utils/interfaces/entities/entities_interfaces.ts";
import { Twitt } from "../../utils/interfaces/entities/entities_interfaces.ts";
import { twittsActions, fetchTwittActions } from "../../utils/constants/constants.ts"

type Action = { type: string, payload: any }

const reducer = (state: TwittInitState, action: Action): TwittInitState => {
    switch (action.type) {
        case twittsActions.FETCH_TWITTS_SUCCESS:
            const { data, method } = action.payload;
            let page: number;
            let updatedTwitts: Twitt[];
            if (method === fetchTwittActions.RELOAD || method === fetchTwittActions.REGULAR) {
                updatedTwitts = [...data];
                page = state.page + 1;
            } else {
                page = 1;
                updatedTwitts = data;
            }
        
            return { ...state, page, twitts: { data: updatedTwitts } };
        case twittsActions.FETCH_ONETWITT_SUCCESS:
            const twittPayload = action.payload;
            return { ...state, oneTwitt: twittPayload }
        case twittsActions.CREATE_TW_ERROR:
            const msg = action.payload.msg;
            return { ...state, twittError: msg }
        default:
            throw new Error('Inesperado tipo de acción')
    }
}

export default reducer