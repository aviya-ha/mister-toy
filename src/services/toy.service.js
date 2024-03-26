import { aStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getEmptyToy,
    getById,
    remove,
}

_createToys()

function query() {
    return aStorageService.query(STORAGE_KEY).then(toys => toys)
}

function getById(toyId) {
    return aStorageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return aStorageService.remove(STORAGE_KEY, toyId)
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        desc: '',
        inStock:(Math.random()>0.5)? true : false
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Teddy Bear' , 15))
        toys.push(_createToy('Rubber Duck' , 50))
        toys.push(_createToy('Toy Car' , 150))
        toys.push(_createToy('Toy Train', 200))
        toys.push(_createToy('Rocking Horse', 185))
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price) {
    const toy = getEmptyToy()
    toy._id = utilService.makeId()
    toy.name = name
    toy.price = +price
    toy.labels.push(_getRandomLable())
    toy.desc = utilService.makeLorem(utilService.getRandomIntInclusive(10, 15))
    toy.creatAt = Date.now()
    return toy
}

function _getRandomLable() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    const num = utilService.getRandomIntInclusive(0, 7)
    return labels[num]
}