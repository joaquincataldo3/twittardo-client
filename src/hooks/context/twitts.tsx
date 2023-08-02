import { createContext, useContext, useEffect, useReducer, useState} from "react";
import { AppContextProp } from "../../types";
import { TwittState, TwittInitState } from "../../types";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import twittsReducer from "../reducer/twitts";
import { twittsActions } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const TwittsContext = createContext<TwittState | null>(null)

const initialState: TwittInitState = {
    twitts: {
        data: []
    },
    oneTwitt: {
        _id: '',
        twitt: '',
        user: {
            _id: '',
            username: '',
            email: '',
            avatar: '',
            followers: [],
            following: [],
            followersNumber: 0,
            followingNumber: 0,
            isAdmin: null,
            favourites: []
        },
        favourites: 0,
        commentsNumber: 0 
    },
    page: 1
}

const TwittContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(twittsReducer, initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [isOneTwittActive, setIsOneTwittActive] = useState(false)
    const navigate = useNavigate()

    const fetchTwitts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${apiUrl}twitts/all?p=${state.page}`)
            const data = response.data
            dispatch({ type: twittsActions.FETCH_TWITTS_SUCCESS, payload: data })
        
            setIsLoading(false)
           
        } catch (error) {
            console.log(error)
            navigate('/home')
        }
    }

    const fetchOneTwitt = async (id: string) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${apiUrl}twitts/${id}`)
            const data = response.data
            dispatch({ type: twittsActions.FETCH_ONETWITT_SUCCESS, payload: data })
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            navigate('/home')
        }
    }

  /*   const disableOneTwitt = () => {
        setIsOneTwittActive(isOneTwittActive => !isOneTwittActive) 
        document.body.style.overflow = 'auto'
    } */
/* 
    const setOneTwitt = (id: string) => {
        setIsOneTwittActive(isOneTwittActive => !isOneTwittActive)   
        dispatch({ type: twittsActions.SET_ONE_TWITT, payload: {id, twitts: state.twitts.data} })
        document.body.style.overflow = 'hidden'
    } */
    

    useEffect(() => {
        fetchTwitts()
    }, [])


    const providerValue = {
        ...state,
        fetchTwitts,
        fetchOneTwitt,
        isLoading,
        isOneTwittActive,
        setIsOneTwittActive
    }

    return <TwittsContext.Provider value={providerValue}>
        {children}
    </TwittsContext.Provider>
}

const useTwittGlobalContext = () => {
    return useContext(TwittsContext)
}

export { TwittContextProvider, useTwittGlobalContext }