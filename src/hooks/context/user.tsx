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
        username: '',
        email: '',
        avatar: '',
        followers: [],
        following: [],
        followersNumber: 0,
        followingNumber: 0
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
            console.log(error)
            const loginError = error.msg
            dispatch({ type: userActions.USER_LOGIN_ERROR, payload: loginError })
        }
    }

    const toggleNavbar = () => {
        setIsMobileNavbarOpen(!isMobileNavbarOpen)
    }



    return <UserContext.Provider value={{ ...state, login: loginFn, isMobileNavbarOpen, toggleNavbar}}>
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