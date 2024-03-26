import { aStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getEmptyToy,
    getById,
    remove,
    save,
    getDefaultFilter,
}

_createToys()

function query(filterBy = {}, sortBy = {}) {
   
    return aStorageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.name) filterBy.name = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            if (!filterBy.inStock) filterBy.inStock = 'all'
            if (filterBy.inStock === 'inStock') filterBy.inStock = false
            if (filterBy.inStock === 'outStock') filterBy.inStock = true
            if (filterBy.inStock === 'all') filterBy.inStock = null
            if (sortBy.type === 'createAt') {
                if (sortBy.desc) sortBy.desc = 1
                if (!sortBy.desc) sortBy.desc = -1
                toys.sort((t1, t2) => (sortBy.desc) * (t2.createAt - t1.createAt))
            }
            if (sortBy.type === 'price') {
                if (sortBy.desc) sortBy.desc = 1
                if (!sortBy.desc) sortBy.desc = -1
                toys.sort((t1, t2) => (sortBy.desc) * (t2.price - t1.price))
            }
            if (sortBy.type === 'name') {
                var num
                if (sortBy.desc) num = 1
                if (!sortBy.desc) num = -1
                toys.sort((t1, t2) => (num) * (t2.name.localeCompare(t1.name)))
            }

            const regExp = new RegExp(filterBy.name, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice &&
                toy.inStock !== filterBy.inStock
            )
        })
}

function getById(toyId) {
    return aStorageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return aStorageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return aStorageService.put(STORAGE_KEY, toy)
    } else {
        return aStorageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        desc: '',
        inStock: (Math.random() > 0.5) ? true : false
    }
}

function getDefaultFilter() {
    return { name: '', maxPrice: '', inStock: 'all' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Teddy Bear', 15))
        toys.push(_createToy('Rubber Duck', 50))
        toys.push(_createToy('Toy toy', 150))
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
    toy.createAt = Date.now()
    return toy
}

function _getRandomLable() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    const num = utilService.getRandomIntInclusive(0, 7)
    return labels[num]
}