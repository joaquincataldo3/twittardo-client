
import { User, UserInitState } from "../../types"
import { userActions } from "../../utils/utils.ts"

type Action = { type: string, payload: any }

const reducer = (state: UserInitState, action: Action) => {
    switch (action.type) {
        case userActions.FETCH_USERS_SUCCESS:
            const users: User[] = action.payload
            return { ...state, users }
        case userActions.FETCH_ONEUSER_SUCCESS:
            const user: User = action.payload
            return { ...state, user }
        case userActions.USER_LOGIN_SUCCESS:
            let followersAccumulator: number = 0   
            const userLogged: User = action.payload.user
            for (let i = 0; i < userLogged.followers.length; i++){
                followersAccumulator++
            }
            userLogged.followersNumber = followersAccumulator
            const token = action.payload.token
            return { ...state, user: userLogged, token }
        case userActions.USER_LOGIN_ERROR:
            const errorMsg = action.payload
            return { ...state, error: errorMsg }
        default:
            throw new Error('Inesperado tipo de acción')
    }
}

export default reducer