import { User } from "../../utils/interfaces/entities/entities_interfaces.ts";
import { UserInitState } from "../../utils/interfaces/entities/entities_interfaces.ts";
import { userActions } from "../../utils/constants/constants.ts";

type Action = { type: string, payload: any }

const reducer = (state: UserInitState, action: Action) => {
    switch (action.type) {
        case userActions.FETCH_USERS_SUCCESS:
            const users: User[] = action.payload
            return { ...state, users }
        case userActions.FETCH_ONEUSER_SUCCESS:
            const user: User = action.payload.user
            return { ...state, userProfile: user }
        case userActions.USER_LOGIN_SUCCESS:
            let followersAccumulator: number = 0
            let followingAccumulator: number = 0
            const userLogged: User = action.payload.user
            for (let i = 0; i < userLogged.followers.length; i++) {
                followersAccumulator++
            }
            for (let i = 0; i < userLogged.following.length; i++) {
                followingAccumulator++
            }
            userLogged.followersNumber = followersAccumulator
            userLogged.followingNumber = followingAccumulator
            const token = action.payload.token
            return { ...state, user: userLogged, token }
        case userActions.USER_FORM_ERROR:
            const errorMsg = action.payload
            return { ...state, formError: errorMsg }
        case userActions.GET_TWITTS_BY_USER:
            const newTwitts = action.payload;
            return { ...state, page: state.userTwittsPage++, twittsByUser: newTwitts }
        case userActions.GET_COMMENTS_BY_USER:
            const newComments = action.payload;
            return { ...state, page: state.userTwittsPage++, commentsByUser: newComments }
        case userActions.GET_FAVOURITES_BY_USER:
            const newFavourites = action.payload;
            return { ...state, page: state.userTwittsPage++, favouritesByUser: newFavourites }
        default:
            throw new Error('Inesperado tipo de acción')
    }
}

export default reducer