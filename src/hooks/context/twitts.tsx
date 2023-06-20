import { createContext, useContext, useEffect, useReducer } from "react";
import { AppContextProp } from "../../types";
import { TwittState } from "../../types";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import twittsReducer from "../reducer/twitts";
import { twittsActions } from "../../utils/utils";

const TwittsContext = createContext<TwittState | null>(null)

const initialState: TwittState = {
    twitts: {
        data: []
    },
    oneTwitt: {
        twitt: '',
        user: ''  // TODO - UPDATE USER PROPERTIES
    }
}

const TwittContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(twittsReducer, initialState)

    const fetchTwitts = async () => {
        try {
            const response = await axios.get(`${apiUrl}twitts/all`)
            const data = response.data
            console.log(data)
            dispatch({ type: twittsActions.FETCH_TWITTS_SUCCESS, payload: data })
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTwitts()
    }, [])


    const providerValue = {
        ...state
    }

    return <TwittsContext.Provider value={providerValue}>
        {children}
    </TwittsContext.Provider>
}

const useTwittGlobalContext = () => {
    return useContext(TwittsContext)
}

export { TwittContextProvider, useTwittGlobalContext }