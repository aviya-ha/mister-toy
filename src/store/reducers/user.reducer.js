import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const REMOVE_USER = 'REMOVE_USER'


const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    users: [],
}

export function userReducer(state = initialState, action = {}){
    switch (action.type){

        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
            case REMOVE_USER:
                return {
                    ...state,
                    users: state.users.filter(loggedInUser => loggedInUser._id !== action.userId)
                }
                case SET_USERS:
                    return { ...state, users: action.users }
            break

        default:
            return state;
    }
}