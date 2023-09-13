import { createContext, useReducer, useContext, useState } from "react";
import { AppContextProp, UserCtxt, UserInitState } from "../../types";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import userReducer from "../reducer/user";
import { userActions } from "../../utils/utils";
import { useNavigate } from "react-router-dom";


const defState: UserCtxt = {
    users: [],
    user: {
        _id: '',
        username: '',
        email: '',
        isAdmin: null,
        followers: [],
        following: [],
        followersNumber: 0,
        followingNumber: 0,
        favourites: []
    },
    isMobileNavbarOpen: false,
    token: '',
    login: (_username: string, _password: string) => {},
    toggleNavbar: () => {},
    checkLogin: () => {},
    handleLogout: () => {}
};
 
const UserContext = createContext<UserCtxt>(defState);

const initialState: UserInitState = {
    users: [],
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
    token: '',
    error: '',
};

const UserContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(userReducer, initialState)
    const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    const loginFn = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${apiUrl}users/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // para recibir y obtener cookies. importante
            });
            dispatch({ type: userActions.USER_LOGIN_SUCCESS, payload: {user: response.data.userVerified} });
            navigate('/home');
        } catch (error: any) {
            let loginError;
            if (error instanceof Error) {
                console.log(`Failed in login: ${error.message}`);
                loginError = error.message;
            } else {
                console.log(`Failed in login: ${error}`);
                loginError = error.msg;
            }
            dispatch({ type: userActions.USER_LOGIN_ERROR, payload: loginError });
        }
    };

    const checkLogin = async () => {
        try {
            const response = await axios(`${apiUrl}users/check-cookie`, {
                headers: {
                    'Content-Type': 'application/json'
                },
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

    const toggleNavbar = () => {
        setIsMobileNavbarOpen(!isMobileNavbarOpen)
    };

    const handleLogout = async () => {
        await axios(`${apiUrl}users/logout`, {withCredentials: true});
        window.location.reload();
    }

    const providerValue = {
        ...state, login: loginFn, isMobileNavbarOpen, toggleNavbar, checkLogin, handleLogout
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