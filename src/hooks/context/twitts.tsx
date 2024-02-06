import axios from "axios";
import twittsReducer from "../reducer/twitts";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AppContextProp } from "../../utils/interfaces/props/props_interfaces";
import { TwittCxt, TwittInitState } from "../../utils/interfaces/entities/entities_interfaces";
import { twittsActions, fetchTwittActions } from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";
import { useUserGlobalContext } from "./user";
import { userEmptyState } from "../../utils/constants/constants";

let reducerInitState: TwittInitState = {
    twitts: {
        data: []
    },
    oneTwitt: {
        _id: '',
        twitt: '',
        user: userEmptyState,
        favourites: 0,
        comments: [],
    },
    page: 0,
    twittError: ''
}

let contextInitState: TwittCxt = {
    ...reducerInitState,
    characters: 280,
    isLoading: false,
    noTwittsLeft: false,
    isFavLoading: false,
    twittTextareaContent: '',
    isTwittTextareaEmpty: false,
    isTwittDeleteInProcess: false,
    twittError: '',
    handleDeleteTwitt: () => {},
    setInitialTextAreaValue: () => {},
    fetchOneTwitt: () => { },
    createTwitt: () => { },
    fetchTwitts: () => { },
    createComment: () => { },
    favTwitt: () => { },
    undoFav: () => { },
    handleCharacters: () => { },
    handleTextareaChange: () => { },
    handleTextareaIsEmpty: () => { }
}

const TwittsContext = createContext<TwittCxt>(contextInitState)


const TwittContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(twittsReducer, reducerInitState);
    const [noTwittsLeft, setNoTwittsLeft] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFavLoading, _setIsFavLoading] = useState<boolean>(false);
    const [characters, setCharacters] = useState(280);
    const [twittTextareaContent, setTwittTextAreaContent] = useState<string>('')
    const [isTwittTextareaEmpty, setIsTwittTextareaEmpty] = useState<boolean>(false);
    const [twittsDataLength, setTwittsDataLength] = useState<number | null>(null);
    const [isTwittDeleteInProcess, setIsTwittDeleteInProcess] = useState<boolean>(false);
    const navigate = useNavigate();
    const { checkLogin} = useUserGlobalContext();
    const apiUrl = process.env.REACT_APP_API_URL;
    const errorMsg = 'Error. Intente nuevamente'

    const fetchTwitts = async (method: string) => {
            setIsLoading(true);
            let page;
            switch (method) {
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
            if (data.length != twittsDataLength) {
                setTwittsDataLength(data.length)
                dispatch({ type: twittsActions.FETCH_TWITTS_SUCCESS, payload: { data, method } });
            } else {
                setNoTwittsLeft(true);
            }
            setIsLoading(false);
    };

    const fetchOneTwitt = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await axios(`${apiUrl}twitts/one/${id}`);
            const data = await response.data;
            dispatch({ type: twittsActions.FETCH_ONETWITT_SUCCESS, payload: data });
            setIsLoading(false);
        } catch (error) {
            navigate('/home');
        }
    };

    const createTwitt = async (formData: FormData) => {
        try {
            setIsLoading(true);
            await axios.post(`${apiUrl}twitts/create`, formData, {
                withCredentials: true
            });
            fetchTwitts(fetchTwittActions.RELOAD);
        } catch (error: any) {
            dispatch({ type: twittsActions.CREATE_TW_ERROR, payload: errorMsg });    
        }
        setIsLoading(false);
    };

    const createComment = async (commentContent: string, twittId: string) => {
        try {
            setIsLoading(true);
            await axios.post(`${apiUrl}comments/${twittId}/create`, {
                comment: commentContent
            }, {
                withCredentials: true
            });
            setIsLoading(false);
            fetchOneTwitt(twittId);
        } catch (error: any) {
            const errorPayload = error.response.data;
            const { msg } = errorPayload;
            dispatch({ type: twittsActions.CREATE_TW_ERROR, payload: msg });
        }
    };

    const favTwitt = async (twittId: string) => {
        await axios.put(`${apiUrl}twitts/add-fav/${twittId}`, null, {
            withCredentials: true
        });
        checkLogin();
        fetchTwitts(fetchTwittActions.RELOAD);
    }

    const undoFav = async (twittId: string) => {
        await axios.put(`${apiUrl}twitts/undo-fav/${twittId}`, null, {
            withCredentials: true
        });
        fetchTwitts(fetchTwittActions.RELOAD);
    }

    const handleCharacters = (method: string) => {
        if (method === 'add') {
            setCharacters(prevState => prevState - 1);
        } else {
            setCharacters(prevState => prevState + 1);
        }
    }

    const handleTextareaChange = (parameter: React.ChangeEvent<HTMLTextAreaElement> | string) => {
        if (typeof parameter === 'string') {
            setTwittTextAreaContent(parameter)
        } else {
            setTwittTextAreaContent(parameter.target.value);
        }
    }

    const handleTextareaIsEmpty = (value: boolean) => {
        setIsTwittTextareaEmpty(value);
    }

    const setInitialTextAreaValue = () => {
        setTwittTextAreaContent('');
    }

       
    const handleDeleteTwitt = async (twittId: string) => {
        setIsTwittDeleteInProcess(true);
        const response = await axios.delete(`${apiUrl}/twitts/${twittId}/delete`);
        if (response.status !== 200) {
            setIsTwittDeleteInProcess(false);
            dispatch({ type: twittsActions.CREATE_TW_ERROR, payload: errorMsg });
        } else {
            navigate('/home')
        }
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
        isTwittDeleteInProcess,
        handleDeleteTwitt,
        handleCharacters,
        fetchOneTwitt,
        createTwitt,
        fetchTwitts,
        createComment,
        favTwitt,
        undoFav,
        handleTextareaChange,
        handleTextareaIsEmpty,
        setInitialTextAreaValue
    }

    
    return <TwittsContext.Provider value={providerValue}>
        {children}
    </TwittsContext.Provider>
}

const useTwittGlobalContext = () => {
    return useContext(TwittsContext)
}

export { TwittContextProvider, useTwittGlobalContext }