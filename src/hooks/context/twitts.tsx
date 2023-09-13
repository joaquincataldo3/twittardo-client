import { createContext, useContext, useEffect, useReducer, useState} from "react";
import { AppContextProp } from "../../types";
import { TwittCxt, TwittInitState } from "../../types";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import twittsReducer from "../reducer/twitts";
import { twittsActions, fetchTwittActions } from "../../utils/utils";
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
    createTwitt: () => {},
    createTwittError: () => {}
}

const TwittsContext = createContext<TwittCxt>(contextInitState)


const TwittContextProvider = ({ children }: AppContextProp) => {


    const userContext = useUserGlobalContext();
    const [state, dispatch] = useReducer(twittsReducer, reducerInitState);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {user} = userContext;

    const fetchTwitts = async (method: string) => {
        try {
            setIsLoading(true);
            let page;
            switch(method){
                case fetchTwittActions.RELOAD:
                    page = state.page - 1;
                    break;
                case fetchTwittActions.REGULAR:
                    page = state.page;
                    break;
                case fetchTwittActions.INITIAL:
                    page = 0;
                    break;
                default: 
                    throw new Error('Invalid action name');
            }
            const response = await axios.get(`${apiUrl}twitts/all?p=${page}`);
            const data = response.data;
            dispatch({ type: twittsActions.FETCH_TWITTS_SUCCESS, payload: {data, method} });
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
            navigate('/home');
        }
    };

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
    };

    const createTwittError = (msg: string) => {
        dispatch({type: twittsActions.CREATE_TW_ERROR, payload: {msg}})
    };

    const createTwitt = async (formData: FormData) => {
        setIsLoading(true);
        const response = await axios.post(`${apiUrl}twitts/${user._id}/create`, formData, {
            withCredentials: true
        });
        if(response.status === 200){
            fetchTwitts('reload'); 
        } else {
            createTwittError('Error al crear el twitt, vuelva a intentarlo');
        }
    };


    useEffect(() => {
        fetchTwitts(fetchTwittActions.INITIAL);
    }, [])


    const providerValue = {
        ...state,
        fetchTwitts,
        fetchOneTwitt,
        isLoading,
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