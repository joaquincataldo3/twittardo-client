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
    userTwittsPage: 1,
    userFavouritesPage: 1,
    userCommentsPage: 1,
    noMoreTwitts: false,
    noMoreComments: false,
    noMoreFavs: false,
    twittsByUser: [],
    commentsByUser: [],
    favouritesByUser: [],
    previousLocation: null,
    isUserLoading: false,
    isUserCommentsLoading: false,
    isUserFavouritesLoading: false,
    isUserTwittsLoading: false,
    isFollowLoading: false,
    login: (_username: string, _password: string) => { },
    toggleNavbar: () => { },
    checkLogin: () => { },
    handleLogout: () => { },
    getUser: () => { },
    redirectUserProfile: () => { },
    registerUser: () => { },
    getTwittsByUser: () => { },
    getCommentsByUser: () => { },
    getFavouritesByUser: () => {},
    handleSetPreviousLocation: () => {},
    followUser: () => {},
    unfollowUser: () => {},
    updateUser: () => {}
};

const UserContext = createContext<UserCtxt>(defState);

const initialState: UserInitState = {
    users: [],
    user: userEmptyState,
    userProfile: userEmptyState,
    token: '',
    error: '',
    formError: '',
    userTwittsPage: 1,
    userFavouritesPage: 1,
    userCommentsPage: 1,
    twittsByUser: [],
    commentsByUser: [],
    favouritesByUser: [],
};

const UserContextProvider = ({ children }: AppContextProp) => {

    const [state, dispatch] = useReducer(userReducer, initialState);
    const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState<boolean>(false);
    const [noMoreTwitts, setNoMoreTwitts] = useState<boolean>(false);
    const [noMoreComments, setNoMoreComments] = useState<boolean>(false);
    const [previousLocation, setPreviousLocation] = useState<string | null>(null);
    const [noMoreFavs, setNoMoreFavs] = useState<boolean>(false);
    const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
    const [isUserTwittsLoading, setIsUserTwittsLoading] = useState<boolean>(false);
    const [isUserCommentsLoading, setIsUserCommentsLoading] = useState<boolean>(false);
    const [isUserFavouritesLoading, setIsUserFavouritesLoading] = useState<boolean>(false);
    const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);
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
        }
    };

    const getUser = async (userId: string | Readonly<Params<string>>) => {
        try {
            setIsUserLoading(true);
            const response = await axios.get(`${apiUrl}users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { data } = response;
            dispatch({ type: userActions.FETCH_ONEUSER_SUCCESS, payload: { user: data } });
            setIsUserLoading(false);
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


    const registerUser = async (formData: FormData) => {
        try {
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

    const updateUser = async (formData: FormData) => {
        try {
            await axios.put(`${apiUrl}users/update`, formData, {
                withCredentials: true
            });
            navigate('/users/login');
        } catch (error: any) {
            const errorPayload = error.response.data;
            const { msg } = errorPayload;
            dispatch({ type: userActions.USER_FORM_ERROR, payload: msg });
        }
    }

    const getTwittsByUser = async (userId: string) => {
        setIsUserTwittsLoading(true);
        const response = await axios.get(`${apiUrl}twitts/by-user/${userId}?p=${state.userTwittsPage}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
    
        const { data } = response;
        const { twitts } = data;
        if(twitts.length > 0) {
            dispatch({type: userActions.GET_TWITTS_BY_USER, payload: twitts});
        } else {
            setNoMoreTwitts(true);
        }
        setIsUserTwittsLoading(false);
    }

    const getCommentsByUser = async (userId: string) => {
        setIsUserCommentsLoading(true);
        const response = await axios.get(`${apiUrl}comments/by-user/${userId}?p=${state.userCommentsPage}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        const { data } = response;
        const { comments } = data;
        if(comments.length > 0) {
            dispatch({type: userActions.GET_COMMENTS_BY_USER, payload: comments});
        } else {
            setNoMoreComments(true);
        }
        setIsUserCommentsLoading(false);
    }

    const getFavouritesByUser = async (userId: string) => {
        setIsUserFavouritesLoading(true);
        const response = await axios.get(`${apiUrl}users/favourites/${userId}?p=${state.userFavouritesPage}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        const { data } = response;
        const { favourites } = data;
        if(favourites.length > 0) {
            dispatch({type: userActions.GET_FAVOURITES_BY_USER, payload: favourites});
        } else {
            setNoMoreFavs(true);
        }
        setIsUserFavouritesLoading(false);
    }
    
    
    const toggleNavbar = () => {
        setIsMobileNavbarOpen(!isMobileNavbarOpen)
    };

    const handleLogout = async () => {
        await axios(`${apiUrl}users/logout`, { withCredentials: true, headers: {
            'Content-Type': 'application/json'
        }});
        window.location.reload();
    }

    const redirectUserProfile = (userId: string) => {
        navigate(`user/profile/${userId}`);
    }

    const handleSetPreviousLocation = (location: string) => {
        setPreviousLocation(location);
    }

    const unfollowUser = async (userId: string) => {
        setIsFollowLoading(true);
        await axios.put(`${apiUrl}users/${userId}/unfollow`, undefined, { withCredentials: true, headers: {
            'Content-Type': 'application/json'
        }});   
        setIsFollowLoading(false);
    }

    const followUser = async (userId: string) => {
        setIsFollowLoading(true);
        await axios.put(`${apiUrl}users/${userId}/follow`, undefined, { withCredentials: true, headers: {
            'Content-Type': 'application/json'
         }});          
         setIsFollowLoading(false);
    }


    const providerValue = {
        ...state,
        isMobileNavbarOpen,
        noMoreTwitts,
        noMoreComments,
        noMoreFavs,
        previousLocation,
        isUserCommentsLoading,
        isUserFavouritesLoading,
        isUserLoading, 
        isUserTwittsLoading,
        isFollowLoading,
        login: loginFn,
        toggleNavbar,
        checkLogin,
        handleLogout,
        getUser,
        redirectUserProfile,
        registerUser,
        getCommentsByUser,
        getTwittsByUser,
        getFavouritesByUser,
        handleSetPreviousLocation,
        followUser,
        unfollowUser,
        updateUser
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