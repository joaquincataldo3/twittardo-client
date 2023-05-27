import { createContext, useContext, useReducer } from "react";
import { AppContextProp, UserContext, UserInitState } from "../../types";
import axios from "axios";
import { apiUrl } from "../../utils/utils";
import userReducer from "../reducer/user";
import { userActions } from "../../utils/utils";


// TODO - CREATE POST FORM
const UserContext = createContext<UserContext>({
    users: [],
    user: {
        username: '',
        email: '',
        avatar: ''
    },
    error: '',
    login: () => {}
})

const initialState: UserInitState = {
    users: [],
    user: {
        username: '',
        email: '',
        avatar: ''
    },
    error: '',
}

const UserContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(userReducer, initialState)

    const login= async (email:string, password: string) => {
        try {
            const response = await axios.post(`${apiUrl}user/login`, {email, password})
            const data = response.data
            dispatch({ type: userActions.USER_LOGIN_SUCCESS, payload: data })
        } catch (error: any) {
            const loginError = error.msg
            dispatch({ type: userActions.USER_LOGIN_ERROR, payload: loginError })
        }
    }


    const providerValue = {
        ...state,
        login
    }

    return <UserContext.Provider value={providerValue}>
        {children}
    </UserContext.Provider>
}

const useUserGlobalContext = () => {
    return useContext(UserContext)
}

export { UserContextProvider, useUserGlobalContext }