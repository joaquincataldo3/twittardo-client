import { createContext, useContext, useEffect, useReducer, useState} from "react";
import { AppContextProp } from "../../types";
import { TwittCxt, TwittInitState } from "../../types";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import twittsReducer from "../reducer/twitts";
import { twittsActions } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useUserGlobalContext } from "./user";

let reducerInitState: TwittInitState  = {
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
    page: 0,
    twittError: '',
    isTwittErrorActive: false
}

let contextInitState: TwittCxt = {
    ...reducerInitState,
    fetchTwitts: () => {},
    fetchOneTwitt: () => {},
    isLoading: false,
    isOneTwittActive: false,
    setIsOneTwittActive: () => {},
    createTwitt: () => {},
    createTwittError: () => {}
}

const TwittsContext = createContext<TwittCxt>(contextInitState)


const TwittContextProvider = ({ children }: AppContextProp) => {


    const userContext = useUserGlobalContext();
    const [state, dispatch] = useReducer(twittsReducer, reducerInitState);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOneTwittActive, setIsOneTwittActive] = useState<boolean>(false);
    const navigate = useNavigate();
    const {user} = userContext;

    const fetchTwitts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${apiUrl}twitts/all?p=${state.page}`)
            const data = response.data
            dispatch({ type: twittsActions.FETCH_TWITTS_SUCCESS, payload: data })
        
            setIsLoading(false)
           
        } catch (error) {
            let loginError;
            if (error instanceof Error) {
                console.log(`Failed in login: ${error.message}`);
                loginError = error.message;
              } else {
                console.log(`Failed in login: ${error}`);
                loginError = error;
              }
            navigate('/home')
        }
    }

    const fetchOneTwitt = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await axios(`${apiUrl}twitts/${id}`);
            const data = response.data;
            dispatch({ type: twittsActions.FETCH_ONETWITT_SUCCESS, payload: data });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            navigate('/home');
        }
    }

    const createTwittError = (msg: string) => {
        dispatch({type: twittsActions.CREATE_TW_ERROR, payload: {msg}})
    }

    const createTwitt = async (formData: FormData) => {
        setIsLoading(true);
        const response = await axios.post(`${apiUrl}twitts/${user._id}/create`, formData);
        if(response.status === 200){
            fetchTwitts(); 
        } else {
            createTwittError('Error al crear el twitt, vuelva a intentarlo');
        }
    }

  
    

    useEffect(() => {
        fetchTwitts()
    }, [])


    const providerValue = {
        ...state,
        fetchTwitts,
        fetchOneTwitt,
        isLoading,
        isOneTwittActive,
        setIsOneTwittActive,
        createTwitt,
        createTwittError
    }

    return <TwittsContext.Provider value={providerValue}>
        {children}
    </TwittsContext.Provider>
}

const useTwittGlobalContext = () => {
    return useContext(TwittsContext)
}

export { TwittContextProvider, useTwittGlobalContext }