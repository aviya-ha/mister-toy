import { httpService } from './http.service'
import { utilService } from './util.service'

const urls = ['https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80', 'https://images.unsplash.com/photo-1633469924738-52101af51d87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
const BASE_URL = 'toy/'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels
}

async function query(filterBy = {}) {
    const toys = await httpService.get(BASE_URL, filterBy)
    return toys
}

function getLabels() {
    return [...labels]
}

async function getById(toyId) {
    const toy = await httpService.get(BASE_URL + toyId)
    return toy
}

async function remove(toyId) {
    const toy = await httpService.delete(BASE_URL + toyId)
    return toy
}

async function save(toy) {
    let savedToy
    if (toy._id) {
        savedToy = await httpService.put(BASE_URL + toy._id, toy)

    } else {
        savedToy = await httpService.post(BASE_URL, toy)
    }
    return savedToy
}

function getEmptyToy() {
    let labelIdx = utilService.getRandomIntInclusive(0, labels.length - 1)
    let imgIdx = utilService.getRandomIntInclusive(0, urls.length - 1)
    return {
        name: '',
        price: '',
        labels: [labels[labelIdx], 'kids'],
        desc: '',
        inStock: (Math.random() > 0.7) ? true : false,
        img: urls[imgIdx],
        msgs: []
    }
}

function getDefaultFilter() {
    return { name: '', maxPrice: '', inStock: '', byLabel: [], sortBy: '' }
}