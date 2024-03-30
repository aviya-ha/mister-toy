import { httpService } from './http.service'

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

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

async function query(filterBy, sort) {
    try {
        return await httpService.get('toy', { params: { filterBy, sort } })
    } catch (err) {
        console.log(err);
    }

}

function getLabels() {
    return [...labels]
}

async function getById(toyId) {
    try {
        return await httpService.get(`toy/${toyId}`)
    } catch (err) {
        console.log(err);
    }

}

async function remove(toyId) {
    try {
        return await httpService.delete(`toy/${toyId}`)
    } catch (err) {
        console.log(err);
    }

}

async function save(toy) {
    if (toy._id) {
        try {
            return await httpService.put(`toy/${toy._id}`, toy)
        } catch (err) {
            console.log(err);
        }

    } else {
        try {
            return await httpService.post('toy', toy)
        } catch (err) {
            console.log(err);
        }

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

function getDefaultSort() {
    return { type: '', desc: -1 }
}
