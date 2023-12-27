import axios from "axios";
import userReducer from "../reducer/user";
import { createContext, useReducer, useContext, useState } from "react";
import { AppContextProp, UserCtxt, UserInitState } from "../../types";
import { userActions } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { userEmptyState } from "../../utils/utils";
import { Params } from "react-router-dom";


const defState: UserCtxt = {
    users: [],
    user: userEmptyState,
    userProfile: userEmptyState,
    isMobileNavbarOpen: false,
    token: '',
    login: (_username: string, _password: string) => {},
    toggleNavbar: () => {},
    checkLogin: () => {},
    handleLogout: () => {},
    getUser: () => {}
};
 
const UserContext = createContext<UserCtxt>(defState);

const initialState: UserInitState = {
    users: [],
    user: userEmptyState,
    userProfile: userEmptyState, 
    token: '',
    error: ''
};

const UserContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(userReducer, initialState)
    const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL;

    const loginFn = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${apiUrl}users/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true 
            });
            
            dispatch({ type: userActions.USER_LOGIN_SUCCESS, payload: {user: response.data.userVerified} });
            navigate('/home');
        } catch (error: any) {
            let loginError;
            if (error instanceof Error) {
                loginError = error.message;
                console.log(`Failed in login: ${loginError}`);
            } else {
                loginError = error.msg;
                console.log(`Failed in login: ${loginError}`);
            }
            dispatch({ type: userActions.USER_LOGIN_ERROR, payload: loginError });
        }
    };

    const checkLogin = async () => {
        try {
            const response = await axios(`${apiUrl}users/check-cookie`, {
                withCredentials: true // para recibir y obtener cookies. importante
            });
            const data = response.data;
            if(data.loggedIn){ 
                dispatch({ type: userActions.USER_LOGIN_SUCCESS, payload: {user: data.user} })
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
            const {data} = response;
            dispatch({ type: userActions.FETCH_ONEUSER_SUCCESS, payload: {user: data} })
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
        await axios(`${apiUrl}users/logout`, {withCredentials: true});
        window.location.reload();
    }

    const providerValue = {
        ...state, login: loginFn, isMobileNavbarOpen, toggleNavbar, checkLogin, handleLogout, getUser
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