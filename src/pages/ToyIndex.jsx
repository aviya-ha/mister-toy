import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToysList } from '../cmps/ToysList.jsx'
import { loadToys, removeToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'



export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

    useEffect(() => {
        loadToys(filterBy , sortBy)
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    if (!toys) return <h1>loading...</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the bast toys in on place</h1>
            <Link to="/toy/edit" ><button>Add new toy</button> </Link>
            <ToyFilter
                onSetFilter={onSetFilter} filterBy={filterBy}
                onSetSort={onSetSort} sortBy={sortBy}
            />
            <main>
                <ToysList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />

            </main>
        </section>
    )

}