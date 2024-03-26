import { toyService } from "../../services/toy.service.js"


export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'




const initialState = {
    toys: [],
    lastToys: [],
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys
            }

        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.car]
            }

        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }


        default:
            return state
    }
}