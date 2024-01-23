import axios from "axios";
import userReducer from "../reducer/user";
import { createContext, useReducer, useContext, useState } from "react";
import { AppContextProp } from "../../utils/interfaces/props/props_interfaces";
import { UserCtxt } from "../../utils/interfaces/entities/entities_interfaces";
import { UserInitState } from "../../utils/interfaces/entities/entities_interfaces";
import { userActions } from "../../utils/constants/constants";
import { useNavigate } from "react-router-dom";
import { userEmptyState } from "../../utils/constants/constants";
import { Params } from "react-router-dom";


const defState: UserCtxt = {
    users: [],
    user: userEmptyState,
    userProfile: userEmptyState,
    isMobileNavbarOpen: false,
    token: '',
    formError: '',
    userTwittsPage: 3,
    noMoreTwitts: false,
    login: (_username: string, _password: string) => { },
    toggleNavbar: () => { },
    checkLogin: () => { },
    handleLogout: () => { },
    getUser: () => { },
    redirectUserProfile: () => { },
    registerUser: () => { },
    getMoreTwittsByUser: () => { }
};

const UserContext = createContext<UserCtxt>(defState);

const initialState: UserInitState = {
    users: [],
    user: userEmptyState,
    userProfile: userEmptyState,
    token: '',
    error: '',
    formError: '',
    userTwittsPage: 3
};

const UserContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(userReducer, initialState);
    const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noMoreTwitts, setNoMoreTwitts] = useState<boolean>(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const loginFn = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${apiUrl}users/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            dispatch({ type: userActions.USER_LOGIN_SUCCESS, payload: { user: response.data.userVerified } });
            navigate('/home');
        } catch (error: any) {
            const errorPayload = error.response.data;
            const { msg } = errorPayload;
            dispatch({ type: userActions.USER_FORM_ERROR, payload: msg });
        }
    };

    const checkLogin = async () => {
        try {
            const response = await axios(`${apiUrl}users/check-cookie`, {
                withCredentials: true // para recibir y obtener cookies. importante
            });
            const data = response.data;
            if (data.loggedIn) {
                dispatch({ type: userActions.USER_LOGIN_SUCCESS, payload: { user: data.user } })
            } else {
                console.log('Not authenticated')
            }
        } catch (error: any) {
            console.log(error.response);
        }
    };

    const getUser = async (userId: string | Readonly<Params<string>>) => {
        try {
            const response = await axios.get(`${apiUrl}users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { data } = response;
            dispatch({ type: userActions.FETCH_ONEUSER_SUCCESS, payload: { user: data } });
        } catch (error) {
            let loginError;
            if (error instanceof Error) {
                loginError = error.message;
                console.log(`Failed in getUser: ${loginError}`);
            } else {
                loginError = error;
                console.log(`Failed in login: ${loginError}`);
            }
        }
    }

    const toggleNavbar = () => {
        setIsMobileNavbarOpen(!isMobileNavbarOpen)
    };

    const handleLogout = async () => {
        await axios(`${apiUrl}users/logout`, { withCredentials: true });
        window.location.reload();
    }

    const redirectUserProfile = (userId: string) => {
        navigate(`user/profile/${userId}`);
    }

    const registerUser = async (formData: FormData) => {
        try {
            setIsLoading(true);
            await axios.post(`${apiUrl}users/register`, formData, {
                withCredentials: true
            });
            navigate('/users/login');
        } catch (error: any) {
            const errorPayload = error.response.data;
            const { msg } = errorPayload;
            dispatch({ type: userActions.USER_FORM_ERROR, payload: msg });
        }
    }

    const getMoreTwittsByUser = async (userId: string) => {
        const response = await axios.get(`${apiUrl}users/twitts/${userId}?p=${state.userTwittsPage}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        const { data } = response;
        if(data.length > 0) {
            dispatch({type: userActions.GET_TWITTS_BY_USER, payload: data});
        } else {
            setNoMoreTwitts(true);
        }
    }
    

    const providerValue = {
        ...state,
        isMobileNavbarOpen,
        noMoreTwitts,
        getMoreTwittsByUser,
        login: loginFn,
        toggleNavbar,
        checkLogin,
        handleLogout,
        getUser,
        redirectUserProfile,
        registerUser,
    };


    return <UserContext.Provider value={providerValue}>
        {children}
    </UserContext.Provider>
}

const useUserGlobalContext = () => {
    const currentUserContext = useContext(UserContext);

    if (!currentUserContext) {
        throw new Error(
            "useCurrentUser has to be used within <CurrentUserContext.Provider>"
        );
    }

    return currentUserContext;
}

export { UserContextProvider, useUserGlobalContext }