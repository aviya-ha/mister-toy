import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    getUsers,
    remove,
}


async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
}

async function signup(newUser) {
    if (!newUser.imgUrl) newUser.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
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
    // const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin, imgUrl: user.imgUrl, }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    if (user) return user
}

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        activities: [],
    }
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123', isAdmin: false})
//     await userService.signup({fullname: 'ani', username: 'admin', password:'123',  isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', isAdmin: false})
// })()