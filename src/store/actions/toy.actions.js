import { toyService } from "../../services/toy.service.js"
import { SET_TOYS, REMOVE_TOY, ADD_TOY, UPDATE_TOY, SET_FILTER_BY} from "../reducers/toy.reducer.js"
import { store } from "../store.js"



export async function loadToys() {
        try {
            const filterBy = store.getState().toyModule.filterBy
            const toys = await toyService.query(filterBy)
            store.dispatch({ type: SET_TOYS, toys })
            return toys
        } catch (err) {
            console.log('toy action -> Cannot load toys', err)
            throw err
        } 
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (error) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toyToSave) {
    const type = toyToSave._id ? UPDATE_TOY : ADD_TOY
    try {
        const toy = await toyService.save(toyToSave)
        store.dispatch({ type, toy })
        return toy
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}