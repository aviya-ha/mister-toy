// import { aStorageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    addActivity
}


async function getById(userId) {
    try{
        const user = await httpService.get(`user/${userId}`)
        return user
    }catch(err){
        console.log(err);
    }
    // return httpService.get(`user/${userId}`)
    // return aStorageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    try{
        const user = await httpService.post('auth/login', {  username, password })
        console.log(user);
        return _setLoggedinUser(user)
      }catch(err){
          console.log(err);
      }
    // return httpService.post('auth/login', {  username, password })
    // return aStorageService.query(STORAGE_KEY)
    //     .then(users => {
    //         const user = users.find(user => user.username === username)
    //         // if (user && user.password !== password) return _setLoggedinUser(user)
    //         if (user) return _setLoggedinUser(user)
    //         else return Promise.reject('Invalid login')
    //     })
}

async function signup(newUser) {
    try{
        const user = await httpService.post('auth/signup', { newUser })
        console.log('user:', user)
        return _setLoggedinUser(user)

    }catch(err){

        console.log(err);
    }
    
    // const userToAdd = getEmptyCredentials()
    // const user = { ...userToAdd,...newUser}
    // return aStorageService.post(STORAGE_KEY, user)
    //     .then(_setLoggedinUser)
}

async function logout() {
    try{
         httpService.post('auth/logout')
         sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    }catch(err){
        console.log(err)
    }
    // return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin  }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function addActivity(type, todoId) {
    const activity = {
        txt: `${type} a Todo with id : ${todoId}`,
        at: Date.now()
    }
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return
    return getById(loggedinUser._id)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.unshift(activity)
            return user
        })
        .then(userToUpdate => {
            return storageService.put(STORAGE_KEY, userToUpdate)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        activities:[],
    }
}