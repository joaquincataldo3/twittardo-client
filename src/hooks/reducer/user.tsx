
import { UserInitState } from "../../types"
import { userActions } from "../../utils/utils.ts"

type Action = { type: string, payload: any }

const reducer = (state: UserInitState, action: Action) => {
    switch (action.type) {
        case userActions.FETCH_USERS_SUCCESS:
            const users = action.payload
            return { ...state, users }
        case userActions.FETCH_ONEUSER_SUCCESS:
            const user = action.payload
            return { ...state, user }
        case userActions.USER_LOGIN_SUCCESS:
            const userLogged = action.payload
            return { ...state, user: userLogged }
        case userActions.USER_LOGIN_ERROR:
            const errorMsg = action.payload
            return { ...state, error: errorMsg }
        default:
            throw new Error('Inesperado tipo de acción')
    }
}

export default reducer