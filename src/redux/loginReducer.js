import { USER_AUTH, USER_AUTH_FAILED, USER_AUTH_SUCCESS, USER_LOGOUT } from "./constants"

const initialUserState = {
    userNumber: '',
    UserName:'',
    isLogged: false,
    isLoading: false,
    error: ''
}

const loginReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case USER_AUTH: {
            return {
                ...state,
                isLoading: true
            }
        }
        case USER_AUTH_SUCCESS: {
            console.log(action.data.usernumber+"==="+action.data.username)
            return {
                ...state,
                userNumber: action.data.usernumber,
                UserName:action.data.username,
                isLogged: true,
                isLoading: false
            }
        }
        case USER_AUTH_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.data
            }
        }
        case USER_LOGOUT: {
            return {
                userNumber: '',
                isLogged: false,
                isLoading: false,
                error: ''
            }
        }
        default: return state;
    }
}

export default loginReducer