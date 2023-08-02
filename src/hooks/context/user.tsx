import { createContext, useReducer, useContext, useState } from "react";
import { AppContextProp, UserCtxt, UserInitState } from "../../types";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import userReducer from "../reducer/user";
import { userActions } from "../../utils/utils";
import { useNavigate } from "react-router-dom";


// TODO - CREATE POST FORM
const UserContext = createContext<UserCtxt | null>(null)

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
}

const UserContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(userReducer, initialState)
    const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    const loginFn = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${apiUrl}users/login`, { email, password })
            const data = response.data
            dispatch({ type: userActions.USER_LOGIN_SUCCESS, payload: data })
            navigate('/home')
        } catch (error: any) {
            console.log(`Failed in login: ${error}`)
            const loginError = error.msg
            dispatch({ type: userActions.USER_LOGIN_ERROR, payload: loginError })
        }
    }

    const checkLogin = async () => {
        try {
            const response = await axios(`${apiUrl}users/check-login`)
            const data = response.data
            if(response.status === 200){
                console.log(data)
            } else {
                console.log('No autenticado')
            }
        } catch (error) {
            console.log(`Failed in check login: ${error}`)
        }
        
    }

    const toggleNavbar = () => {
        setIsMobileNavbarOpen(!isMobileNavbarOpen)
    }

    const providerValue = {
        ...state, login: loginFn, isMobileNavbarOpen, toggleNavbar, checkLogin
    }


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