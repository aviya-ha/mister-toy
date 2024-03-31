import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials
}


async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
}

async function signup(newUser) {
    const user = await httpService.post(BASE_URL + 'signup', { newUser })
    if (user) return _setLoggedinUser(user)
}

async function logout() {
    await httpService.post(BASE_URL + '/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    // const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin  }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    if (user) return user
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        activities: [],
    }
}