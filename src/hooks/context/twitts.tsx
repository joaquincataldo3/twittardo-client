import axios from "axios";
import twittsReducer from "../reducer/twitts";
import { createContext, useContext, useEffect, useReducer, useState} from "react";
import { AppContextProp } from "../../utils/interfaces/props/props_interfaces";
import { TwittCxt, TwittInitState } from "../../utils/interfaces/entities/entities_interfaces";
import { twittsActions, fetchTwittActions } from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";
import { useUserGlobalContext } from "./user";
import { userEmptyState } from "../../utils/constants/constants";

let reducerInitState: TwittInitState  = {
    twitts: {
        data: []
    },
    oneTwitt: {
        _id: '',
        twitt: '',
        user: userEmptyState,
        favourites: 0,
        commentsNumber: 0,
        comments: [],
    },
    page: 0,
    twittError: '',
    isTwittErrorActive: false,
}

let contextInitState: TwittCxt = {
    ...reducerInitState,
    characters: 280,
    isLoading: false,
    noTwittsLeft: false,
    isFavLoading: false,
    twittTextareaContent: '',
    isTwittTextareaEmpty: false,
    createTwittError: false,
    fetchOneTwitt: () => {},
    createTwitt: () => {},
    fetchTwitts: () => {},
    createComment: () => {},
    favTwitt: () => {},
    undoFav: () => {},
    handleCharacters: () => {},
    handleTextareaChange: () => {},
    handleTextareaIsEmpty: () => { }
} 

const TwittsContext = createContext<TwittCxt>(contextInitState)


const TwittContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(twittsReducer, reducerInitState);
    const [noTwittsLeft, setNoTwittsLeft] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFavLoading, setIsFavLoading] = useState<boolean>(false);
    const [createTwittError, setCreateTwittError] = useState<boolean>(false);
    const [characters, setCharacters] = useState(280);
    const [twittTextareaContent, setTwittTextAreaContent] = useState<string>('')
    const [isTwittTextareaEmpty, setIsTwittTextareaEmpty] = useState<boolean>(false);
    const userContext = useUserGlobalContext();
    const navigate = useNavigate();
    const {user} = userContext;
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchTwitts = async (method: string) => {
        try {
            setIsLoading(true);
            let page;
            switch(method){
                case fetchTwittActions.RELOAD:
                    page = state.page;
                    break;
                case fetchTwittActions.REGULAR:
                    page = state.page + 1;
                    break;
                case fetchTwittActions.INITIAL:
                    page = 1;
                    break;
                default: 
                    throw new Error('Invalid action name');
            }
            const response = await axios.get(`${apiUrl}twitts/all?p=${page}`);
            const data = response.data;
            if(data.length > 0) {
                dispatch({ type: twittsActions.FETCH_TWITTS_SUCCESS, payload: {data, method} });
            } else {
                setNoTwittsLeft(true);
            }
            setIsLoading(false);
            
        } catch (error) {
            let fetchError;
            if (error instanceof Error) {
                console.log(`Failed in login: ${error.message}`);
                fetchError = error.message;
              } else {
                console.log(`Failed in login: ${error}`);
                fetchError = error;
              }
            navigate('/home');
        }
    };

    const fetchOneTwitt = async (id: string) => {
        try {  
            setIsLoading(true);
            const response = await axios(`${apiUrl}twitts/${id}`);
            const data = await response.data;
            dispatch({ type: twittsActions.FETCH_ONETWITT_SUCCESS, payload: data });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            navigate('/home');
        }
    };

    const createTwitt = async (formData: FormData) => {
        setIsLoading(true);
        const response = await axios.post(`${apiUrl}twitts/${user._id}/create`, formData, {
            withCredentials: true
        });
        if(response.status === 200){
            fetchTwitts(fetchTwittActions.RELOAD); 
        } else {
            setCreateTwittError(true);
        }
    };

    const createComment = async (commentContent: string, twittId: string) => {
        setIsLoading(true);
        const response = await axios.post(`${apiUrl}comments/${twittId}/${user._id}/create`, {
            comment: commentContent
        }, {
            withCredentials: true
        });
        if(response.status === 200){
            navigate(`/twitts/${twittId}`)
        } else {
            setCreateTwittError(true);
        }
    };

    const favTwitt = async (twittId: string, userId: string) => {
        setIsFavLoading(true);
        await axios.put(`${apiUrl}twitts/add-fav/${twittId}/${userId}`, null, {
            withCredentials: true
        });
        setIsFavLoading(false);
    }

    const undoFav = async (twittId: string, userId: string) => {
        setIsFavLoading(true);
        await axios.put(`${apiUrl}twitts/undo-fav/${twittId}/${userId}`, null, {
            withCredentials: true
        });
        setIsFavLoading(false);
    }

    const handleCharacters = (method: string) => {
        if(method === 'add') {
            setCharacters(prevState => prevState - 1);
        } else {
            setCharacters(prevState => prevState + 1);
        }
    }

    const handleTextareaChange = (parameter: React.ChangeEvent<HTMLTextAreaElement> | string) => {
        if(typeof parameter === 'string') {
            setTwittTextAreaContent(parameter)
        } else {
            setTwittTextAreaContent(parameter.target.value);
        }
    } 

    const handleTextareaIsEmpty = (value: boolean) => {
        setIsTwittTextareaEmpty(value);
    }
    
    useEffect(() => {
        fetchTwitts(fetchTwittActions.INITIAL);
    }, [])


    const providerValue = {
        ...state,
        noTwittsLeft,
        isLoading,
        isFavLoading,
        characters,
        twittTextareaContent,
        isTwittTextareaEmpty,
        createTwittError,
        handleCharacters,
        fetchOneTwitt,
        createTwitt,
        fetchTwitts,
        createComment,
        favTwitt,
        undoFav,
        handleTextareaChange,
        handleTextareaIsEmpty,
    }

    return <TwittsContext.Provider value={providerValue}>
        {children}
    </TwittsContext.Provider>
}

const useTwittGlobalContext = () => {
    return useContext(TwittsContext)
}

export { TwittContextProvider, useTwittGlobalContext }